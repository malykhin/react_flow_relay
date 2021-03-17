// @flow

export const CORE_SKILL_FIELDS: Object = `
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
`;
