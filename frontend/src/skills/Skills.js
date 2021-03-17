// @flow

import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SKILLS, ADD_SKILL } from "./queries";
import Section from "./Section";
import AddSkillModal from "./AddSkillModal";
import { useReducer } from "react";

type nodeType = {
  node: {
    id: string,
    name: string
  }
};

type fieldsType = {
  id: string,
  name: string,
  skills: {
    edges: Array<nodeType>
  }
};

type dataType = {
  frontEnd: fieldsType,
  backEnd: fieldsType
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

function reducer(state: stateType, action: actionType) {
  switch (action.type) {
    case SET_DISPLAY_DATA:
      const { frontEnd, backEnd } = action.payload;
      return { ...state, frontEnd: { ...frontEnd }, backEnd: { ...backEnd } };
    case SHOW_MODAL:
      const { areaId, name } = action.payload;
      const newArea = { areaId, name };
      return { ...state, modalOpen: true, area: newArea };
    case CLOSE_MODAL:
      return { ...state, modalOpen: false };
    default:
      return state;
  }
}

export default function Skills(): React$Element<any> {
  const { data, loading } = useQuery<dataType, Boolean>(GET_SKILLS);
  const [addSkill, newData] = useMutation(ADD_SKILL);

  const [{ modalOpen, area, frontEnd, backEnd }, dispatch] = useReducer<
    stateType,
    Function
  >(reducer, initialState);

  useEffect(() => {
    if (!loading) {
      dispatch({
        type: SET_DISPLAY_DATA,
        payload: { frontEnd: data.frontEnd, backEnd: data.backEnd }
      });
    }
  }, [loading]);

  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  const handleSave = async data => {
    await addSkill({
      variables: { areaId: area.areaId, skillName: data.skill },
      refetchQueries: [{ query: GET_SKILLS }] // temporary
    });
    if (!newData.loading) {
      handleCloseModal();
    }
  };
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="flex-box">
        <Section
          sectionData={frontEnd}
          listClickListener={() =>
            dispatch({
              type: SHOW_MODAL,
              payload: { areaId: data.frontEnd.id, name: data.frontEnd.name }
            })
          }
        />
        <Section
          sectionData={backEnd}
          listClickListener={() =>
            dispatch({
              type: SHOW_MODAL,
              payload: { areaId: data.backEnd.id, name: data.backEnd.name }
            })
          }
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
