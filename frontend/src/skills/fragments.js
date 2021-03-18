// @flow

export const CORE_SKILL_FIELDS: Object = `
  fragment CoreSkillFields on Area {
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
