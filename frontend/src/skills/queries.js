// @flow

import graphql from "babel-plugin-relay/macro";

const GET_SKILLS: Object = graphql`
  query queriesGetSkillsQuery {
    frontEnd {
      ...fragmentsArea
    }
    backEnd {
      ...fragmentsArea
    }
  }
`;

const ADD_SKILL: Object = graphql`
  mutation queriesAddSkillMutation($areaId: ID!, $skillName: String!) {
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
