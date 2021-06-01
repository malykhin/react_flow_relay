import * as React from 'react';
type Props ={
    skills : Array<{
        id: string,
        name: string,
      }>,
}
function SkillsContainer(props:Props): React.Node {
  return (
    <div className="skills">
      {props.skills.map((skill)=>(
          <ul key={skill.id}>{skill.name}</ul>
      ))}
    </div>
  );
}

export default SkillsContainer;
