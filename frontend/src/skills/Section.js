// @flow

import React from "react";
import List from "../components/List";
import "./skills.css";

type Props = {
  sectionData: Object,
  listClickListener: Function
};

export default function Section({
  sectionData,
  listClickListener
}: Props): React$Element<any> {
  const { name, skills } = sectionData;
  return (
    <div>
      <h1>{name}</h1>
      <div className="list-wrapper" onClick={listClickListener}>
        <List
          listData={skills.edges}
          idField="id"
          nameField="name"
          nestedObjectName="node"
        />
      </div>
    </div>
  );
}
