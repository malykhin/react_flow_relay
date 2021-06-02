import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddSkillModal({skill, setSkill, show, handleClose, onSaveChanges }) {
    
   
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Skills</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form >
						{/* <Form.Group className="mb-3" controlId="formSkillId">
							<Form.Label>Skill Id</Form.Label>
							<Form.Control type="text" placeholder="Enter Skill Id" />
						</Form.Group> */}

						<Form.Group className="mb-3" controlId="formSkillName">
							<Form.Label>Skill Name</Form.Label>
							<Form.Control type="text" placeholder="Skill Name" value={skill} onChange={(e)=>{
                                console.log(e)
                                setSkill(e.target.value)}}/>
						</Form.Group>
						
						{/* <Button variant="primary" type="submit">
							Submit
						</Button> */}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={onSaveChanges}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
