import {Button} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {getCompany, getPosts, deletePost, addPost} from '../utils/api'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Spinner, Modal, Form} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyDetails = ({match, token, userId}) => {

    const [company, setCompany] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // add post
    const [text, setText] = useState("")
    const [images, setImages] = useState("")

    const handleAddPost = (e) =>{
        e.preventDefault();
        addPost(text, images.split('\s*,\s*'), match.params.companyId, token).then(v => setPosts(posts => [...posts, v]))
        handleClose()
        toast.success("Added Post Successfully!", {position:toast.POSITION.TOP_CENTER})
    }
    
    function handlePostDelete(postId){
        deletePost(postId, token).then(v => setPosts(posts => posts.filter(p => p.postId != postId)))
        toast.error("Post has been Deleted!",{position:toast.POSITION.TOP_CENTER})
    }

    useEffect(() => {
        console.log(userId)
        getCompany(match.params.companyId).then(res => setCompany(res));
        getPosts(match.params.companyId).then(res => setPosts(res));
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
                userId == company.ownerId ?  <button onClick={handleShow}> Add Post</button> : <></>
            }

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
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
