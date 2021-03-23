// @flow

import React, { useEffect, useCallback } from "react";
import { usePreloadedQuery, useMutation } from "react-relay/hooks";
import { GET_SKILLS, ADD_SKILL } from "./queries";
import Section from "./Section";
import AddSkillModal from "./AddSkillModal";
import { useReducer } from "react";
import update from "immutability-helper";

type Props = {
  preLoadedQuery: Object
};

type keyValueType = {
  id: string,
  name: string
};

type nodeType = {
  node: keyValueType
};

type fieldsType = {
  id: string,
  name: string,
  skills: {
    edges: Array<nodeType>
  }
};

type stateType = {
  modalOpen: boolean,
  area: {
    areaId: string,
    name: string
  },
  frontEnd: fieldsType,
  backEnd: fieldsType
};

type actionType = {
  type: string,
  payload: Object
};

const initialState = {
  modalOpen: false,
  area: {},
  frontEnd: { id: "", name: "", skills: { edges: [] } },
  backEnd: { id: "", name: "", skills: { edges: [] } }
};

const SET_DISPLAY_DATA = "set_display_data";
const SHOW_MODAL = "show_modal";
const CLOSE_MODAL = "close_modal";
export const ADD_SKILL_TO_AREA = "add_skill";

export function reducer(state: stateType, action: actionType): Object {
  switch (action.type) {
    case SET_DISPLAY_DATA:
      const { frontEnd, backEnd } = action.payload;
      return { ...state, frontEnd: { ...frontEnd }, backEnd: { ...backEnd } };
    case SHOW_MODAL:
      const { areaId, name } = action.payload;
      const showArea = { areaId, name };
      return { ...state, modalOpen: true, area: showArea };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false };
    case ADD_SKILL_TO_AREA:
      const { areaKey, newSkill } = action.payload;
      const newArea: fieldsType = update(state[areaKey], {
        skills: { edges: { $push: [{ node: { ...newSkill } }] } }
      });
      return { ...state, [areaKey]: newArea };
    default:
      return state;
  }
}

export default function Skills({ preLoadedQuery }: Props): React$Element<any> {
  const data = usePreloadedQuery(GET_SKILLS, preLoadedQuery);
  const [addSkill] = useMutation(ADD_SKILL);

  const [{ modalOpen, area, frontEnd, backEnd }, dispatch] = useReducer<
    stateType,
    Function
  >(reducer, initialState);

  useEffect(() => {
    if (data && data.frontEnd && data.backEnd) {
      dispatch({
        type: SET_DISPLAY_DATA,
        payload: { frontEnd: data.frontEnd, backEnd: data.backEnd }
      });
    }
  }, [data]);

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const handleSave = async data => {
    addSkill({
      variables: { areaId: area.areaId, skillName: data.skill },
      onCompleted(data) {
        const areaId = data.introduceSkill.area.id;
        const updatedAreaKey = areaId === frontEnd.id ? "frontEnd" : "backEnd";
        const newSkill = data.introduceSkill.skill;
        dispatch({
          type: ADD_SKILL_TO_AREA,
          payload: { areaKey: updatedAreaKey, newSkill }
        });
        handleCloseModal();
      }
    });
  };

  return (
    <>
      <div className="flex-box">
        <Section
          sectionData={frontEnd}
          listClickListener={useCallback(
            () =>
              dispatch({
                type: SHOW_MODAL,
                payload: { areaId: frontEnd.id, name: frontEnd.name }
              }),
            [dispatch, frontEnd]
          )}
        />
        <Section
          sectionData={backEnd}
          listClickListener={useCallback(
            () =>
              dispatch({
                type: SHOW_MODAL,
                payload: { areaId: backEnd.id, name: backEnd.name }
              }),
            [dispatch, backEnd]
          )}
        />
      </div>
      <AddSkillModal
        open={modalOpen}
        title={area.name}
        closeListener={handleCloseModal}
        saveListener={handleSave}
      />
    </>
  );
}
