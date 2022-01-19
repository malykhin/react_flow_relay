import React from 'react';

const SkillsList = ({data}) => {
  console.log(data);
	return (
    <section>
      <h1>{data.name}</h1>
      <ul>
        {data?.skills && data.skills?.edges && data.skills.edges.map(edge => (
          <li>{edge?.name}</li>
        ))}
      </ul>
    </section>
  )
};

export default SkillsList;

