import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import { addClaimRequest, uploadImages } from "../../utils/api";
import { toast, ToastContainer } from "react-toastify";
import { StyledGroup, StyledGroup2, StyledHeader } from '../formStyle'
import axios from 'axios';

function ClaimRequestModal(props) {
    const [claimDescription, setClaimDescription] = useState("")
    const [claimTitle, setClaimTitle] = useState("")
    const [claimIdentification, setClaimIdentification] = useState([])
    const [claimProofOfWork, setClaimProofOfWork] = useState([])
    const [claimLinkedIn, setClaimLinkedIn] = useState("")

    const { show, setShow, companyId, token } = props;

    const handleAddClaimRequest = (e) => {
        e.preventDefault();

        const identificationUrlList = []
        const uploadIdentification = uploadImages(claimIdentification, identificationUrlList.push.bind(identificationUrlList))
        axios.all(uploadIdentification).then(() => {
            const claimUrlList = []
            const uploadClaim = uploadImages(claimProofOfWork, claimUrlList.push.bind(claimUrlList))
            axios.all(uploadClaim).then(() => {
                addClaimRequest(claimDescription, claimTitle, identificationUrlList[0], claimUrlList[0], claimLinkedIn, companyId, token)
                    .then(() => {
                        setShow(false);
                        toast.success("Claim Request posted Successfully!", { position: toast.POSITION.TOP_CENTER })
                        setClaimDescription("")
                        setClaimTitle("")
                        setClaimIdentification([])
                        setClaimProofOfWork([])
                        setClaimLinkedIn("")
                    })
                    .catch(() => {
                        toast.error("Unable to post claim request", { position: toast.POSITION.TOP_CENTER });
                    });
            }).catch(error => {
                toast.error("Failed to upload Proof of work image", { position: toast.POSITION.TOP_CENTER })
            })
        }).catch(error => {
            toast.error("Failed to upload identification image", { position: toast.POSITION.TOP_CENTER });
        })
    }


    return (
        <div>
            <ToastContainer autoClose={3000}/>
            <Modal show={show} onHide={() => setShow(false)}>
                <Form>
                    <StyledHeader>Create Post</StyledHeader>
                    <StyledGroup>
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} value={claimDescription}
                            onChange={e => setClaimDescription(e.target.value)}></Form.Control>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Job Title</Form.Label>
                        <Form.Control value={claimTitle} onChange={e => setClaimTitle(e.target.value)}></Form.Control>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Identification Card (image)</Form.Label>
                        <Form.Control type="file"
                            onChange={e => setClaimIdentification(claimIdentification => [...claimIdentification, ...e.target.files])} />
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Proof of Work (image)</Form.Label>
                        <Form.Control type="file"
                            onChange={e => setClaimProofOfWork(claimProofOfWork => [...claimProofOfWork, ...e.target.files])} />
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>LinkedIn Account</Form.Label>
                        <Form.Control value={claimLinkedIn}
                            onChange={e => setClaimLinkedIn(e.target.value)}></Form.Control>
                    </StyledGroup>
                    <StyledGroup2>
                        <Button variant="primary" type="submit" onClick={handleAddClaimRequest}>
                            Submit
                        </Button>
                    </StyledGroup2>
                </Form>
            </Modal>
        </div>
    )
}

export default ClaimRequestModal;