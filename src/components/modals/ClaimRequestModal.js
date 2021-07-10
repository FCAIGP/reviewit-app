import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {addClaimRequest} from "../../utils/api";
import {toast} from "react-toastify";


function ClaimRequestModal(props){
    const [claimDescription, setClaimDescription] = useState("")
    const [claimTitle, setClaimTitle] = useState("")
    const [claimIdentification, setClaimIdentification] = useState("")
    const [claimProofOfWork, setClaimProofOfWork] = useState("")
    const [claimLinkedIn, setClaimLinkedIn] = useState("")

    const {show, setShow, companyId, token} = props;

    const handleAddClaimRequest = (e) => {
        e.preventDefault();
        addClaimRequest(claimDescription, claimTitle, claimIdentification, claimProofOfWork, claimLinkedIn, companyId, token)
            .then(()=>{
                setShow(false);
                toast.success("Claim Request posted Successfully!", {position: toast.POSITION.TOP_CENTER})
            })
            .catch(()=>{
                toast.error("Unable to post claim request", {position: toast.POSITION.TOP_CENTER});
            });
    }


    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Form>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={claimDescription}
                                  onChange={e => setClaimDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control value={claimTitle} onChange={e => setClaimTitle(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Identification Card (image)</Form.Label>
                    <Form.Control value={claimIdentification}
                                  onChange={e => setClaimIdentification(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Proof of Work (image)</Form.Label>
                    <Form.Control value={claimProofOfWork}
                                  onChange={e => setClaimProofOfWork(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>LinkedIn Account</Form.Label>
                    <Form.Control value={claimLinkedIn}
                                  onChange={e => setClaimLinkedIn(e.target.value)}></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleAddClaimRequest}>
                    Submit
                </Button>
            </Form>
        </Modal>
    )
}

export default ClaimRequestModal;