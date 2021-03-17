// @flow

import { gql } from "@apollo/client";
import { CORE_SKILL_FIELDS } from "./fragments";

const GET_SKILLS: Object = gql`
  query GetSkills {
    frontEnd {
      ${CORE_SKILL_FIELDS}
    }
    backEnd {
      ${CORE_SKILL_FIELDS}
    }
  }
`;

const ADD_SKILL: Object = gql`
  mutation AddSkill($areaId: ID!, $skillName: String!) {
    introduceSkill(input: { areaId: $areaId, skillName: $skillName }) {
      area {
        id
        name
        skills {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
`;

export { GET_SKILLS, ADD_SKILL };
