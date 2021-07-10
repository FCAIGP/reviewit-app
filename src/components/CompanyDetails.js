import {Button, Form, Modal, Spinner} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {addPost, addReview, deletePost, deleteReview, getCompany, getPosts, getReviews} from '../utils/api'
import {connect} from 'react-redux'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Review from './Review';
import Post from './Post'
import PostsList from './company_details/PostsList';
import ReviewsList from './company_details/ReviewsList';
import {StyledGroup, StyledGroup2, StyledHeader} from './formStyle'

import ClaimRequestModal from "./modals/ClaimRequestModal";
import AddPostModal from './modals/AddPostModal';
import AddReviewModal from './modals/AddReviewModal';


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

    const handleAddPost = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (postImage.length > 0) {
                const urlList = []
                const upload = postImage.map(img => {
                    const formData = new FormData()
                    formData.append("file", img);
                    formData.append("upload_preset", "pnwecikc");
                    return axios.post("https://api.cloudinary.com/v1_1/dyhfbrmbx/image/upload", formData).then((response) => {
                        urlList.push(response.data.url)
                        setImages(images => [...images, response.data.url])
                    }).catch(error => {
                        console.log(error)
                    })
                })
                axios.all(upload).then(() => {
                    addPost(text, urlList, match.params.companyId, token).then((v) => {
                        setPosts(posts => [...posts, v])
                        setImages([])
                        setText([])
                        setPostImage([])
                    })
                        .catch(error => {
                            console.log(error)
                        })
                    handleClose()
                    toast.success("Added Post Successfully!", {position: toast.POSITION.TOP_CENTER})
                })
                    .catch(error => {
                        console.log(error)
                    })
            } else {
                addPost(text, images, match.params.companyId, token).then((v) => {
                    setPosts(posts => [...posts, v])
                    setImages([])
                    setPostImage([])
                    setText([])
                })
                    .catch(error => {
                        console.log(error)
                    })
                handleClose()
                toast.success("Added Post Successfully!", {position: toast.POSITION.TOP_CENTER})
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
        setPostValidated(true)
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
            <AddReviewModal show={showAddReview} setShow={setShowAddReview} companyId={company.companyId} token={token} setReviews={setReviews}
                            userId = {userId} AddReviewClose={AddReviewClose}/>
            <br/>
            <PostsList posts={posts} companyId={company.companyId} ownerId={company.ownerId} userId={userId}/>
            <button onClick={AddReviewShow}> Add Review</button>
            <ReviewsList reviews={reviews} isAdmin={isAdmin} handleReviewDelete={handleReviewDelete}/>
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
