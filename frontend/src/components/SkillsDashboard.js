import * as React from 'react';
import { useState, useEffect } from 'react';
import SkillsContainer from './SkillsContainer';
type Props = {
	data: {
		frontEnd: {
			skills: {
				edges: Array<{
					node: { id: string, name: string },
				}>,
			},
		},
		backEnd: {
			skills: {
				edges: Array<{
					node: { id: string, name: string },
				}>,
			},
		},
	},
};

function SkillsDashboard(props: Props): React.Node {
	const [frontendSkills, setFrontendSkills] = useState([]);
	const [backendSkills, setBackendSkills] = useState([]);

	useEffect(() => {
		if (props.data) {
			setFrontendSkills(
				props.data.frontEnd.skills.edges.map((skill) => skill.node)
			);
			setBackendSkills(
				props.data.backEnd.skills.edges.map((skill) => skill.node)
			);
		}
	}, [props?.data]);
	return (
		<>
			<div className="frontend-skills">
				<p>Frontend Skills</p>
				<SkillsContainer skills={frontendSkills} />
			</div>
			<div className="backend-skills">
				<p>Backend Skills</p>
				<SkillsContainer skills={backendSkills} />
			</div>
		</>
	);
}

export default SkillsDashboard;
