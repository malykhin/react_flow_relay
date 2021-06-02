// @flow

import graphql from 'babel-plugin-relay/macro';

const getSkillQuery: Object = graphql`
	query queryGetSkillsQuery {
		frontEnd {
			...fragmentsArea
		}
		backEnd {
			...fragmentsArea
		}
	}
`;

const addSkillQuery: Object = graphql`
	mutation queryAddSkillMutation($areaId: ID!, $skillName: String!) {
		introduceSkill(input: { areaId: $areaId, skillName: $skillName }) {
			skill {
				id
				name
			}
			area {
				id
			}
		}
	}
`;

export { getSkillQuery, addSkillQuery };
