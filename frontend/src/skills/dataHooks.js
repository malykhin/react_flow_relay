// @flow

import { useEffect, useReducer } from "react";
import { usePreloadedQuery, useMutation } from "react-relay/hooks";
import update from "immutability-helper";
import { GET_SKILLS, ADD_SKILL } from "./queries";
import type {
  DataStateType,
  ActionType,
  FieldsType,
  DataHookReturnType
} from "./types";

const initialState = {
  frontEnd: { id: "", name: "", skills: { edges: [] } },
  backEnd: { id: "", name: "", skills: { edges: [] } }
};

const SET_DISPLAY_DATA = "set_display_data";
const ADD_SKILL_TO_AREA = "add_skill";

function reducer(state: DataStateType, action: ActionType): Object {
  switch (action.type) {
    case SET_DISPLAY_DATA:
      const { frontEnd, backEnd } = action.payload;
      return { ...state, frontEnd: { ...frontEnd }, backEnd: { ...backEnd } };
    case ADD_SKILL_TO_AREA:
      const { areaKey, newSkill } = action.payload;
      const newArea: FieldsType = update(state[areaKey], {
        skills: { edges: { $push: [{ node: { ...newSkill } }] } }
      });
      return { ...state, [areaKey]: newArea };
    default:
      return state;
  }
}

export function useDataService(preLoadedQuery: Object): DataHookReturnType {
  const data = usePreloadedQuery(GET_SKILLS, preLoadedQuery);
  const [addSkill, isLoading] = useMutation(ADD_SKILL);

  const [{ frontEnd, backEnd }, dispatch] = useReducer<DataStateType, Function>(
    reducer,
    initialState
  );

  useEffect(() => {
    if (data && data.frontEnd && data.backEnd) {
      dispatch({
        type: SET_DISPLAY_DATA,
        payload: { frontEnd: data.frontEnd, backEnd: data.backEnd }
      });
    }
  }, [data]);

  function saveData(areaId: string, skillName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      addSkill({
        variables: { areaId, skillName },
        onCompleted(data) {
          const areaId = data.introduceSkill.area.id;
          const updatedAreaKey =
            areaId === frontEnd.id ? "frontEnd" : "backEnd";
          const newSkill = data.introduceSkill.skill;
          dispatch({
            type: ADD_SKILL_TO_AREA,
            payload: { areaKey: updatedAreaKey, newSkill }
          });
          resolve(true);
        }
      });
    });
  }
  return { frontEnd, backEnd, saveData, isLoading };
}
