// @flow

import React from "react";
import { graphql } from "react-apollo";
import { getBackEndSkills } from "./queries";
import Section from "./Section";

type nodeType = {
  node: {
    id: string,
    name: string
  }
};

interface Props {
  data: {
    loading: Boolean,
    backEnd: {
      name: String,
      skills: {
        edges: Array<nodeType>
      }
    }
  };
}
function BackEndList({ data }: Props): React$Element<any> {
  const { backEnd, loading } = data;
  return (
    <Section loading={loading} sectionData={backEnd}/>
  );
}
const exportGql: Object = graphql(getBackEndSkills)(BackEndList);
export default exportGql;
