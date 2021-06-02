import React, { useEffect, useReducer } from 'react';
import { useMutation, usePreloadedQuery, useFragment } from 'react-relay/hooks';
import { getSkillQuery, addSkillQuery } from './../utility/query';
import { areaFragment } from './../utility/fragments';

const SHOW_SKILLS = 'show_skills';
const ADD_SKILL = 'add_skill';

const reducer = (state, { type, payload }) => {
	switch (type) {
		case SHOW_SKILLS:
			return { ...state, ...payload };
		case ADD_SKILL:
			const { areaKey, skill } = payload;
			return {
				...state,
				[areaKey]: {
					...state[areaKey],
					skills: {
						edges: [...state[areaKey].skills.edges, { node: { ...skill } }],
					},
				},
			};
		default:
			return state;
	}
};
export default function useDataManager(preLoadedQuery) {
	const { frontEnd: frontendData, backEnd: backendData } = usePreloadedQuery(
		getSkillQuery,
		preLoadedQuery
	);
	const [addSkill, isLoading] = useMutation(addSkillQuery);
	const frontendSkills = useFragment(areaFragment, frontendData);
	const backendSkills = useFragment(areaFragment, backendData);
	const [{ frontEnd, backEnd }, dispatch] = useReducer(reducer, {});

	useEffect(() => {
		if (frontendSkills && backendSkills) {
			dispatch({
				type: SHOW_SKILLS,
				payload: { frontEnd: frontendSkills, backEnd: backendSkills },
			});
		}
	}, [frontendSkills, backendSkills]);

	function saveData(areaId, skillName) {
		return new Promise((resolve, reject) => {
			addSkill({
				variables: { areaId, skillName },
				onCompleted(data) {
					const { skill, area } = data.introduceSkill;
					dispatch({
						type: ADD_SKILL,
						payload: {
							areaKey: area.id === frontEnd.id ? 'frontEnd' : 'backEnd',
							skill,
						},
					});
					resolve(true);
				},
			});
		});
	}
	return [frontEnd, backEnd, saveData, isLoading];
}
