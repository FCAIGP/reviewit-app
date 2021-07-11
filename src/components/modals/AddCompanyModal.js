import React, { useState } from 'react'
import { Form, Modal, Button } from 'react-bootstrap'
import { StyledHeader, StyledGroup, StyledGroup2 } from '../formStyle'
import axios from 'axios'
import { uploadImages, addCompany } from '../../utils/api'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'

function AddCompanyModal(props) {

    const [name, setName] = useState("")
    const [headquarters, setHeadquarters] = useState("")
    const [industry, setIndustry] = useState("")
    const [region, setRegion] = useState("")
    const [logo, setLogo] = useState([])
    const [companyValidated, setCompanyValidated] = useState(false)
    const { show, setShow, setCompanies, token } = props;

    const handleAddCompany = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            const logoUrl = []
            const upload = uploadImages(logo, logoUrl.push.bind(logoUrl))
            axios.all(upload).then(() => {
                addCompany(name, headquarters, industry, region, logoUrl[0], token).then((res) => {
                    setCompanies(companies => [...companies, res])
                    setName("")
                    setHeadquarters("")
                    setIndustry("")
                    setRegion("")
                    setLogo([])
                    setShow(false)
                    toast.success("Created Company page successfuly!", { position: toast.POSITION.TOP_CENTER })
                }).catch(error => {
                    toast.error("Failed to Create Company Page", { position: toast.POSITION.TOP_CENTER })
                })
            }).catch(error => {
                toast.error("Failed to upload logo", { position: toast.POSITION.TOP_CENTER })
            })
        }
        setCompanyValidated(true)
        e.preventDefault();
    }

    return (
        <div>
            <ToastContainer autoClose={3000}/>
            <Modal show={show} onHide={() => setShow(false)}>
                <Form noValidate validated={companyValidated} onSubmit={handleAddCompany}>
                    <StyledHeader>Create Company Page</StyledHeader>
                    <StyledGroup>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required as="textarea" placeholder="Enter name" value={name}
                            onChange={e => setName(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Company name can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Headquarters</Form.Label>
                        <Form.Control required as="textarea" placeholder="Enter headquarter" value={headquarters}
                            onChange={e => setHeadquarters(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Company headquarters can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Industry</Form.Label>
                        <Form.Control required as="textarea" placeholder="Enter industry" value={industry}
                            onChange={e => setIndustry(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Company industry can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Region</Form.Label>
                        <Form.Control required as="textarea" placeholder="Enter region" value={region}
                            onChange={e => setRegion(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Company region can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Logo</Form.Label>
                        <Form.Control type="file"
                            onChange={e => setLogo(logo => [...logo, ...e.target.files])} />
                    </StyledGroup>
                    <StyledGroup2>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </StyledGroup2>
                </Form>
            </Modal>
        </div>
    )
}

export default connect(({ authedUser }) => {
    return ({ token: authedUser.token, isAdmin: authedUser.isAdmin })
})(AddCompanyModal);
