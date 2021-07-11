import React, {useEffect, useState} from 'react'
import {deletePost, getPost, updatePost} from '../utils/api'
import {Button, Form, Modal} from 'react-bootstrap'
import {connect} from 'react-redux'
import {toast} from 'react-toastify';
import {StyledGroup, StyledGroup2, StyledHeader} from './formStyle'

const Post = ({id, token, companyID, ownerID, userID}) => {

    const [post, setPost] = useState(null);

    const [text, setText] = useState("")
    const [images, setImages] = useState("")
    const [showUpdate, setShowUpdate] = useState(false)

    const handleClose = () => setShowUpdate(false);
    const handleShow = () => setShowUpdate(true);


    function handlePostDelete(postId) {
        deletePost(postId, token).then(v => console.log(v))
        // toast.error("Post has been Deleted!",{position:toast.POSITION.TOP_CENTER})
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updatePost(post.postId, text, images.split(','), companyID, token).then((res) => {
            console.log(res)
            toast.success("Post Updated Successfuly!", {position: toast.POSITION.TOP_CENTER})
            handleClose();
        })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getPost(id).then(res => {
            setPost(res)
            setImages(res.images)
            setText(res.text)
        })
    }, [id]);

    return (
        <div>
            <Modal show={showUpdate} onHide={handleClose}>
                <Form>
                    <StyledHeader>Update Post</StyledHeader>
                    <StyledGroup>
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={text}
                                      onChange={e => setText(e.target.value)}/>
                    </StyledGroup>

                    <StyledGroup>
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="text" placeholder="array of strings for now" defaultValue={images}
                                      value={images} onChange={e => setImages(e.target.value)}/>
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
                            <img alt='' width="100" height="100" src={image} key={image}/>
                        ))
                    }
                    <p>Created Date: {post.createdDate}</p>
                    {ownerID === userID &&
                    <div>
                        <Button onClick={handleShow} variant="primary"> Update Post</Button>
                        <Button onClick={() => handlePostDelete(post.postId)}
                                variant="danger">Delete</Button>
                    </div>
                    }
                </div>
            }
            <br/>
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(Post);
