import React, {useState} from 'react'
import {Button, Form, Modal} from "react-bootstrap";
import {addReview, predictTagsFor} from "../../utils/api";
import {toast} from "react-toastify";
import {StyledGroup, StyledGroup2, StyledHeader} from '../formStyle'
import Tags from '../Tags'

function AddReviewModal(props) {

    const TYPING_INTERVAL = 2500;

    const [contactInfo, setContactInfo] = useState('')
    const [salary, setSalary] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [reviewTags, setReviewTags] = useState([])
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [reviewValidated, setReviewValidated] = useState(false);
    const [typingTimer, setTypingTimer] = useState(null);
    const onReviewBodyKeyDown = (e) => {
        clearTimeout(typingTimer);
    }
    const onReviewBodyKeyUp = (e) => {
        clearTimeout(typingTimer);
        setTypingTimer(setTimeout(handleTagsAPI, TYPING_INTERVAL));
    }
    const handleTagsAPI = () => {
        predictTagsFor(reviewBody)
            .then(arr => setReviewTags(arr))
            .catch((e) => console.log(e));
    }

    const {show, setShow, companyId, token, setReviews, userId} = props;

    const handleAddReview = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            addReview(contactInfo, salary, jobDescription, reviewBody, reviewTags, companyId, isAnonymous, token)
                .then((v) => {
                    setReviews(reviews => [...reviews, v])
                    setReviewBody('')
                    setSalary('')
                    setContactInfo('')
                    setJobDescription('')
                    setReviewTags([])
                    setIsAnonymous(true)
                    setShow(false)
                    toast.success("Added Review Successfuly!", {position: toast.POSITION.TOP_CENTER})
                }).catch(error => {
                toast.error("Failed to add review", {position: toast.POSITION.TOP_CENTER})
            })
        }
        setReviewValidated(true);
        e.preventDefault();
    }

    return (
        <div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Form noValidate validated={reviewValidated} onSubmit={handleAddReview}>
                    <StyledHeader>Add Review</StyledHeader>
                    <StyledGroup>
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control type="text" value={contactInfo} onChange={e => setContactInfo(e.target.value)}/>
                    </StyledGroup>

                    <StyledGroup>
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="text" value={salary}
                                      onChange={e => setSalary(e.target.value.replace(/\D/, ''))}/>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control type="text" value={jobDescription}
                                      onChange={e => setJobDescription(e.target.value)}/>
                    </StyledGroup>

                    <StyledGroup>
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" rows={3} value={reviewBody}
                                      onChange={e => setReviewBody(e.target.value)}
                                      onKeyUp={onReviewBodyKeyUp}
                                      onKeyDown={onReviewBodyKeyDown}
                        />
                        <Form.Control.Feedback type="invalid">Review body can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Tags</Form.Label>
                        <Tags setTagSearch = {setReviewTags} values = {reviewTags}/>
                        {/* <Form.Control type="text" placeholder="tags seperated by a comma"
                                      value={reviewTags} onChange={e => setReviewTags(e.target.value)}/> */}
                    </StyledGroup>
                    {
                        userId &&
                        <StyledGroup>
                            <Form.Check type="checkbox" label="Anonymous?" checked={isAnonymous}
                                        onChange={e => setIsAnonymous(e.target.checked)}/>
                        </StyledGroup>
                    }
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

export default AddReviewModal
