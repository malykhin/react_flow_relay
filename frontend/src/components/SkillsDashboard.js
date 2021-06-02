import React, { useState, useEffect } from 'react';
import { useMutation, usePreloadedQuery, useFragment } from 'react-relay/hooks';
import useDataManager from './../hooks/useDataManager';
import SkillsContainer from './SkillsContainer';
import AddSkillModal from './AddSkillModal';

function SkillsDashboard({ preLoadedQuery }: Props): React.Node {
	const [show, setShow] = useState(false);
	const [areaID, setAreaID] = useState(null);
	const [skill, setSkill] = useState('');
	const [frontEnd, backEnd, saveData, isLoading] =
		useDataManager(preLoadedQuery);
	const showModal = (areaID) => {
		setShow(true);
		setAreaID(areaID);
		console.log(areaID);
	};
	const closeModal = () => {
		setShow(false);
		setAreaID(null);
	};
	const onSaveChanges = () => {
		saveData(areaID, skill);
		closeModal();
	};
	return (
		<>
			<div className="frontend-skills">
				<SkillsContainer
					skills={frontEnd}
					name="Frontend Skills"
					addSkillHandler={() => showModal(frontEnd.id)}
				/>
			</div>
			<div className="backend-skills">
				<SkillsContainer
					skills={backEnd}
					name="Backend Skills"
					addSkillHandler={() => showModal(backEnd.id)}
				/>
			</div>
			<AddSkillModal
				skill={skill}
				setSkill={setSkill}
				show={show}
				handleClose={closeModal}
				onSaveChanges={onSaveChanges}
			/>
		</>
	);
}

export default SkillsDashboard;
