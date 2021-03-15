// @flow

import { gql } from "@apollo/client";
import { CORE_SKILL_FIELDS } from './fragments';

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

export { GET_SKILLS };
