// @flow

import { gql } from "@apollo/client";


const GET_SKILLS: Object = gql`
  query GetSkills {
    backEnd {
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
`;

export { GET_SKILLS };
