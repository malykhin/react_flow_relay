// @flow

import { gql } from "@apollo/client";
import { CORE_SKILL_FIELDS } from "./fragments";

const GET_SKILLS: Object = gql`
  ${CORE_SKILL_FIELDS}
  query GetSkills {
    frontEnd {
      ...CoreSkillFields
    }
    backEnd {
      ...CoreSkillFields
    }
  }
`;

const ADD_SKILL: Object = gql`
  mutation AddSkill($areaId: ID!, $skillName: String!) {
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

export { GET_SKILLS, ADD_SKILL };
