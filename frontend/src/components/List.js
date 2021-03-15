// @flow

import React from "react";

type Props = {
  idField: string,
  nameField: string,
  nestedObjectName?: string,
  listData: Array<Object>
};

export default function List({
  idField,
  nameField,
  nestedObjectName,
  listData
}: Props): React$Element<any> {
  return (
    <ul>
      {listData.map(data => {
        const id = nestedObjectName
          ? data[nestedObjectName][idField]
          : data[idField];
        const name = nestedObjectName
          ? data[nestedObjectName][nameField]
          : data[nameField];
        return <li key={id}>{name}</li>;
      })}
    </ul>
  );
}
