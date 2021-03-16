// @flow

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SKILLS } from "./queries";
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
  name: string,
  skills: {
    edges: Array<nodeType>
  }
};

type dataType = {
  frontEnd: {
    ...fieldsType
  },
  backEnd: {
    ...fieldsType
  }
};

type stateType = {
  modalOpen: boolean,
  modalTitle: string
};

type actionType = {
  type: string,
  payload?: string | Number | Object
}

const initialState = { modalOpen: false, modalTitle: "" };

function reducer(state: stateType, action: actionType) {
  switch (action.type) {
    case "show_modal":
      return { ...state, modalOpen: true, modalTitle: action.payload };
    case "close_modal":
      return { ...state, modalOpen: false };
    default:
      return state;
  }
}

export default function Skills(): React$Element<any> {
  const { data, loading } = useQuery<dataType, Boolean>(GET_SKILLS);
  const [{ modalOpen, modalTitle }, dispatch] = useReducer<Function, Object>(
    reducer,
    initialState
  );
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="flex-box">
        <Section
          sectionData={data}
          dataKey="frontEnd"
          listClickListener={() =>
            dispatch({ type: "show_modal", payload: "Front End" })
          }
        />
        <Section
          sectionData={data}
          dataKey="backEnd"
          listClickListener={() =>
            dispatch({ type: "show_modal", payload: "Back End" })
          }
        />
      </div>
      <AddSkillModal
        open={modalOpen}
        title={modalTitle}
        closeListener={() => dispatch({ type: "close_modal" })}
      />
    </>
  );
}
