import React, { useEffect, useState } from 'react'
import { deletePost, getPost, updatePost, uploadImages } from '../utils/api'
import { Button, Form, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import { StyledGroup, StyledGroup2, StyledHeader } from './formStyle'
import axios from 'axios'

const Post = ({ id, token, companyID, ownerID, userID, setPosts }) => {

    const [post, setPost] = useState(null);

    const [text, setText] = useState("")
    const [images, setImages] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)
    const [postImages, setPostImages] = useState([])
    
    function handlePostDelete(post_ID) {
        deletePost(post.postId, token).then((v) => {
            setPosts(posts => posts.filter(p => p.postId != post_ID))
            toast.success("Post has been Deleted!", { position: toast.POSITION.TOP_CENTER })
        })
            .catch(error => {
                toast.error("There was an error deleting post", { position: toast.POSITION.TOP_CENTER })
            })

    }

    const handleUpdate = (e) => {
        e.preventDefault();
        var urlList = []
        const upload = uploadImages(postImages, urlList.push.bind(urlList))
        axios.all(upload).then(() => {
            if(urlList.length < 1) urlList = images
            updatePost(post.postId, text, urlList, companyID, token).then((res) => {
                toast.success("Post Updated Successfuly!", { position: toast.POSITION.TOP_CENTER })
                setShowUpdate(false)
            }).catch(error => {
                console.log(error)
            })
        })
    }

    useEffect(() => {
        getPost(id).then(res => {
            setPost(res)
            setImages(res.images)
            setText(res.text)
        })
    }, []);

    return (
        <div>
            <Modal show={showUpdate} onHide={() => setShowUpdate(false)}>
                <Form>
                    <StyledHeader>Update Post</StyledHeader>
                    <StyledGroup>
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} value={text} defaultValue={text}
                            onChange={e => setText(e.target.value)} />
                    </StyledGroup>

                    <StyledGroup>
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="file" multiple
                            onChange={e => setPostImages(postImages => [...postImages, ...e.target.files])} />
                    </StyledGroup>
                    <StyledGroup2>
                        <Button variant="primary" type="submit" onClick={handleUpdate}>
                            Submit
                        </Button>
                    </StyledGroup2>
                </Form>
            </Modal>

            {
                post &&
                <div>
                    <p>Text: {post.text}</p>
                    {
                        post.images.map(image => (
                            <img width="100" height="100" src={image} key={image} />
                        ))
                    }
                    <p>Created Date: {post.createdDate}</p>
                    {ownerID == userID &&
                        <div>
                            <Button onClick={() => setShowUpdate(true)} variant="primary"> Update Post</Button>
                            <Button onClick={() => handlePostDelete(post.postId)}
                                variant="danger">Delete</Button>
                        </div>
                    }
                </div>
            }
            <br />
        </div>
    )
}

export default connect(({ authedUser }) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({ token: authedUser.token, isAdmin: authedUser.isAdmin, userId })
})(Post);
