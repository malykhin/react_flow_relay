import React from "react";

type listDataTypes = {
  node: {
    id: string,
    name: string
  }
};

interface Props {
  loading: Boolean;
  sectionData: {
    name: String,
    skills: {
      edges: Array<listDataTypes>
    }
  };
}

export default function Section({ loading, sectionData }: Props) {
  if (loading) return <h1>Loading....</h1>;
  const { name, skills } = sectionData;
  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {skills.edges.map(({ node }) => (
          <li key={node.id}>{node.name}</li>
        ))}
      </ul>
    </div>
  );
}
