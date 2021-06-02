// @flow

import graphql from "babel-plugin-relay/macro";

export const areaFragment: Object = graphql`
  fragment fragmentsArea on Area {
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
`;
