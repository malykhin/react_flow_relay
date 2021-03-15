// @flow

import React from "react";
import List from "../components/List";

type Props = {
  dataKey: string,
  sectionData: Object
};

export default function Section({
  dataKey,
  sectionData
}: Props): React$Element<any> {
  const { name, skills } = sectionData[dataKey];
  return (
    <div>
      <h1>{name}</h1>
      <List
        listData={skills.edges}
        idField="id"
        nameField="name"
        nestedObjectName="node"
      />
    </div>
  );
}
