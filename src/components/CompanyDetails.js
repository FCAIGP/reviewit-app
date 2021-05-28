import {Button} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {getCompany, getPosts, deletePost, addPost, getReviews, addReview, deleteReview} from '../utils/api'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Spinner, Modal, Form} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './Review';

const CompanyDetails = ({match, token, userId, isAdmin}) => {

    const [company, setCompany] = useState({})
    const [posts, setPosts] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    

    const [show, setShow] = useState(false)
    const [showAddReview, setShowAddReview] = useState(false)

    const AddReviewClose = () => setShowAddReview(false)
    const AddReviewShow = () => setShowAddReview(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // add post
    const [text, setText] = useState("")
    const [images, setImages] = useState("")


    // add review
    const [contactInfo, setContactInfo] = useState(null)
    const [salary, setSalary] = useState(null)
    const [jobDescription, setJobDescription] = useState(null)
    const [reviewBody, setReviewBody] = useState(null)
    const [reviewTags, setReviewTags] = useState(null)
    const [isAnonymous, setIsAnonymous] = useState(true)

    const handleAddPost = (e) =>{
        e.preventDefault();
        addPost(text, images.split('\s*,\s*'), match.params.companyId, token).then(v => setPosts(posts => [...posts, v]))
        handleClose()
        toast.success("Added Post Successfully!", {position:toast.POSITION.TOP_CENTER})
    }
    
    const handleAddReview = (e) =>{
        e.preventDefault()
        console.log(isAnonymous)
        addReview(contactInfo, salary, jobDescription, reviewBody, reviewTags.split('\s*,\s*'), match.params.companyId, isAnonymous, token)
        .then(v => setReviews(reviews => [...reviews, v]))
        AddReviewClose()
        toast.success("Added Review Successfuly!", {position:toast.POSITION.TOP_CENTER})
        setIsAnonymous(true)
    }

    function handlePostDelete(postId){
        deletePost(postId, token).then(v => setPosts(posts => posts.filter(p => p.postId != postId)))
        toast.error("Post has been Deleted!",{position:toast.POSITION.TOP_CENTER})
    }

    function handleReviewDelete(review_Id){
        {/* TO DO figure out why reviews are not filtered like Posts delete */}
        deleteReview(review_Id, token).then(v => setReviews(reviews => reviews.filter(p => p.reviewId != review_Id)))
        toast.error("Review has been Deleted!",{position:toast.POSITION.TOP_CENTER})
    }

    useEffect(() => {
        console.log(userId)
        getCompany(match.params.companyId).then(res => setCompany(res));
        getPosts(match.params.companyId).then(res => setPosts(res));
        getReviews(match.params.companyId).then(res => setReviews(res));
        setLoading(false)
    },[match.params.companyId]);

    return (
        <div>
            <ToastContainer autoClose={3000} />
            {/* todo : adjust loading spinner place */}
            {loading ? <Spinner animation="border" /> : <></>}
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
        
            {
                userId ? userId == company.ownerId ?  <button onClick={handleShow}> Add Post</button> : <></> : <></>
            }
            
            {/* Add post */}
            <Modal show = {show} onHide = {handleClose}>
                <Form>
                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => setText(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="text" placeholder="array of strings for now"
                            onChange={e => setImages(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleAddPost}>
                        Submit
                </Button>
                </Form>
            </Modal>

            {/* Add Review */}
            <Modal show = {showAddReview} onHide = {AddReviewClose}>
                <Form>
                    <Form.Group>
                        <Form.Label>Contact Info</Form.Label>
                        <Form.Control type="text" onChange={e => setContactInfo(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Salary</Form.Label>
                        <Form.Control type="text" onChange={e => setSalary(e.target.value.replace(/\D/,''))}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Job Description</Form.Label>
                        <Form.Control type="text" onChange={e => setJobDescription(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => setReviewBody(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tags</Form.Label>
                        <Form.Control type="text" placeholder="tags seperated by a comma"
                            onChange={e => setReviewTags(e.target.value)} />
                    </Form.Group>

                    {
                        userId ? 
                        <Form.Group>
                            <Form.Check type="checkbox" label="Anonymous?" defaultChecked = {isAnonymous} onChange={e => setIsAnonymous(e.target.checked)}/>
                        </Form.Group> : <> </>
                    }

                    <Button variant="primary" type="submit" onClick={handleAddReview}>
                        Submit
                </Button>
                </Form>
            </Modal>


            <br/>
            <h1>Posts</h1>
            <br/>
            {
                posts.map(post => (
                    <>
                    <p>Text: {post.text}</p>
                    <p>Images: {post.images}</p>
                    <p>Created Date: {post.createdDate}</p>

                    {
                        userId == company.ownerId ?
                        <div>

                        <Link to={{pathname:`${window.location.pathname}/updatePost/${post.postId}`, text: post.text, images:post.images}} variant="primary">Update</Link>
                        <Button onClick={() => handlePostDelete(post.postId)} variant="danger">Delete</Button> </div>:
                        <></>
                    }
                    
                    <br/>
                    </>
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
                       <Review id = {review.reviewId} authorId = {review.authorId ? review.authorId : null}/>
                        {
                            isAdmin ? <Button onClick={() => handleReviewDelete(review.reviewId)} variant="danger">Delete</Button> : <></>
                        }
                        <p>-------------------------------------------------------------------------------</p>
                    </div>
                ))
            }
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
