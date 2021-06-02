import * as React from 'react';
type Props = {
	skills: Array<{
		id: string,
		name: string,
	}>,
};
function SkillsContainer(props: Props): React.Node {
	const { skills: skillsObj, addSkillHandler } = props;
	return (
		<>
			{' '}
			<p>{skillsObj?.name}</p>
			<div className="skills" onClick={addSkillHandler}>
				{skillsObj?.skills.edges.map(({ node }) => (
					<ul key={node.id}>{node.name}</ul>
				))}
			</div>
		</>
	);
}

export default SkillsContainer;
