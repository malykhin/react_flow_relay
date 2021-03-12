// @flow

import { gql } from "apollo-boost";

const getBackEndSkills: Object = gql`
  {
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

export { getBackEndSkills };
