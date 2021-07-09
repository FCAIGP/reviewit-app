import React from 'react'
import {useEffect, useState} from 'react'
import {getPost} from '../utils/api'
import {Button} from 'react-bootstrap'
import {deletePost} from '../utils/api'
import {connect} from 'react-redux'
import {Modal, Form} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import {updatePost} from '../utils/api'

const Post = ({id, token, companyID, ownerID, userID}) => {
    
    const [post, setPost] = useState(null);

    const [text, setText] = useState("")
    const [images, setImages] = useState("")
    const [showUpdate, setShowUpdate] = useState(false)

    const handleClose = () => setShowUpdate(false);
    const handleShow = () => setShowUpdate(true);


    function handlePostDelete(postId){
        deletePost(postId, token).then(v => console.log(v))
        // toast.error("Post has been Deleted!",{position:toast.POSITION.TOP_CENTER})
    }

    const handleUpdate = (e) =>{
        e.preventDefault();
        updatePost(post.postId, text, images.split('\s*,\s*'), companyID, token).then(res => console.log(res))
        toast.success("Post Updated Successfuly!",{position:toast.POSITION.TOP_CENTER})
        handleClose();
    }

    useEffect(() => {
        getPost(id).then(res =>{
            setPost(res)
            setImages(res.images)
            setText(res.text)
        })
    },[]);

    return (
        <div>
            <Modal show = {showUpdate} onHide = {handleClose}>
                <Form>
                    <Form.Group>
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue={text} onChange={e => setText(e.target.value)} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Images</Form.Label>
                        <Form.Control type="text" placeholder="array of strings for now" defaultValue ={images}
                            onChange={e => setImages(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleUpdate}>
                        Submit
                </Button>
                </Form>
            </Modal>

            {
                post? 
                <div>
                    <p>Text: {post.text}</p>
                    <p>Images: {post.images}</p>
                    <p>Created Date: {post.createdDate}</p>
                    { ownerID == userID ?
                        <button onClick={handleShow}> Update Post</button>
                        : <></>
                    }
                </div>
                : <></>
            }
            <br/>
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(Post);
