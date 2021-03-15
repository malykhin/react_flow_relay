// @flow

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SKILLS } from "./queries";
import Section from "./Section";

type nodeType = {
  node: {
    id: string,
    name: string
  }
};

type fieldsType = {
  name: string,
  skills: {
    edges: Array<nodeType>
  }
};

type dataType = {
  backEnd: {
    ...fieldsType
  }
};

export default function Skills(): React$Element<any> {
  const { data, loading } = useQuery<dataType, Boolean>(GET_SKILLS);
  if (loading) return <h1>Loading...</h1>;
  return <Section sectionData={data} dataKey="backEnd" />;
}
