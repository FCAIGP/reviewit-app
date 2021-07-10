import {Button, Form, Modal, Spinner} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {addPost, addReview, deletePost, deleteReview, getCompany, getPosts, getReviews} from '../utils/api'
import {connect} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './Review';
import Post from './Post'
import {StyledGroup, StyledGroup2, StyledHeader} from './formStyle'

import ClaimRequestModal from "./modals/ClaimRequestModal";
import AddPostModal from './modals/AddPostModal';


const CompanyDetails = ({match, token, userId, isAdmin}) => {

    const [company, setCompany] = useState({})
    const [posts, setPosts] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)


    const [showAddPost, setShowAddPost] = useState(false)
    const [showAddReview, setShowAddReview] = useState(false)
    const [showClaimRequest, setShowClaimRequest] = useState(false)

    const AddReviewClose = () => setShowAddReview(false)
    const AddReviewShow = () => setShowAddReview(true)

    
    const handleShow = () => setShowAddPost(true);

    // add post

    // add review
    const [contactInfo, setContactInfo] = useState(null)
    const [salary, setSalary] = useState(null)
    const [jobDescription, setJobDescription] = useState(null)
    const [reviewBody, setReviewBody] = useState(null)
    const [reviewTags, setReviewTags] = useState(null)
    const [isAnonymous, setIsAnonymous] = useState(true)
    const [reviewValidated, setReviewValidated] = useState(false);

    const handleAddReview = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            addReview(contactInfo, salary, jobDescription, reviewBody, reviewTags.split('\s*,\s*'), match.params.companyId, isAnonymous, token)
                .then((v) => {
                    setReviews(reviews => [...reviews, v])
                    setReviewBody(null)
                    setSalary(null)
                    setContactInfo(null)
                    setJobDescription(null)
                    setReviewTags(null)
                    setIsAnonymous(true)
                })
            AddReviewClose()
            toast.success("Added Review Successfuly!", {position: toast.POSITION.TOP_CENTER})
        }
        setReviewValidated(true);
        e.preventDefault();
    }

    const updatePostState = () => {
        console.log("i am here")
        getPosts(match.params.companyId).then(res => setPosts(res))
    }

    function handlePostDelete(postId) {
        deletePost(postId, token).then(v => setPosts(posts => posts.filter(p => p.postId != postId)))
        toast.error("Post has been Deleted!", {position: toast.POSITION.TOP_CENTER})
    }

    function handleReviewDelete(review_Id) {
        {/* TO DO figure out why reviews are not filtered like Posts delete */
        }
        deleteReview(review_Id, token).then(v => setReviews(reviews => reviews.filter(p => p.reviewId != review_Id)))
        toast.error("Review has been Deleted!", {position: toast.POSITION.TOP_CENTER})
    }

    useEffect(() => {
        getCompany(match.params.companyId).then(res => setCompany(res));
        getPosts(match.params.companyId).then(res => setPosts(res));
        getReviews(match.params.companyId).then(res => setReviews(res));
        setLoading(false)
    }, [match.params.companyId]);

    return (
        <div>
            <ToastContainer autoClose={3000}/>
            {/* todo : adjust loading spinner place */}
            {loading && <Spinner animation="border"/>}
            <div>
                <h1>Company Details</h1>
                <p>Name: {company.name}</p>
                <p>Headquarters: {company.headquarters}</p>
                <p>Industry: {company.industry}</p>
                <p>Region: {company.region}</p>
                <p>Created Date: {company.createdDate}</p>
                <p>Logo: {company.logoURL}</p>
                <p>Score up to date: {company.isScoreUpToDate ? "Yes" : "No"}</p>
                <p>Score: {company.score}</p>
                <p>Close Status: {company.closeStatus}</p>
                <br/>
            </div>
            {
                userId && userId == company.ownerId && <button onClick={handleShow}> Add Post</button>
            }
            {
                !company.ownerId &&
                <button onClick={() => setShowClaimRequest(true)}>Claim Ownership of Company</button>
            }
            <ClaimRequestModal show={showClaimRequest} setShow={setShowClaimRequest} companyId={company.companyId}
                               token={token}/>

            {/* Add post */}
            <AddPostModal setPosts={setPosts} show={showAddPost} setShow={setShowAddPost} />
            {/* Add Review */}

            <Modal show={showAddReview} onHide={AddReviewClose}>
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
                                      onChange={e => setReviewBody(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">Review body can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="tags seperated by a comma"
                                      value={reviewTags} onChange={e => setReviewTags(e.target.value)}/>
                    </StyledGroup>

                    {
                        userId &&
                        <StyledGroup>
                            <Form.Check type="checkbox" label="Anonymous?" defaultChecked={isAnonymous}
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


            <br/>
            <h1>Posts</h1>
            <br/>
            {
                posts.map(post => (
                    <div key={post.postId}>
                        <Post id={post.postId} companyID={company.companyId} ownerID={company.ownerId} userID={userId}/>
                        {
                            userId == company.ownerId ?
                                <div>
                                    <Button onClick={() => handlePostDelete(post.postId)}
                                            variant="danger">Delete</Button></div> :
                                <></>
                        }
                    </div>
                ))
            }
            <h1>Reviews</h1>
            <br/>
            {
                reviews.length == 0 ? <h3>No reviews yet</h3> : <></>
            }

            <button onClick={AddReviewShow}> Add Review</button>

            {
                reviews.map(review => (
                    <div key={review.reviewId}>
                        <Review id={review.reviewId} authorId={review.authorId ? review.authorId : null}/>
                        {
                            isAdmin ? <Button onClick={() => handleReviewDelete(review.reviewId)}
                                              variant="danger">Delete</Button> : <></>
                        }
                        <p>-------------------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
