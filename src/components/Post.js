import React, { useEffect, useState } from 'react'
import { deletePost, getPost, updatePost, uploadImages } from '../utils/api'
import { Form, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import { StyledGroup, StyledGroup2, StyledHeader } from './formStyle'
import axios from 'axios'
import {Item, Image, Button, ItemGroup, Divider} from "semantic-ui-react";
import moment from "moment";

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
    }, [id]);

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
                    <ItemGroup>
                        <Item>
                            <Item.Content>
                                <Item.Header>Header</Item.Header>
                                <Item.Extra>Created Date: {moment.utc(post.createdDate).fromNow()}</Item.Extra>
                                <Item.Description>
                                    {
                                        post.images.map(image => (
                                            <Image src={image} key={image} size="large" />
                                        ))
                                    }
                                    { post.text }
                                </Item.Description>


                            {ownerID === userID &&
                                <Item.Extra>
                                    <Button primary icon='undo' onClick={() => setShowUpdate(true)} content='Update Post'/>
                                    <Button negative icon='delete' onClick={() => handlePostDelete(post.postId)} content='Delete'/>
                                </Item.Extra>
                            }
                            </Item.Content>
                        </Item>
                    </ItemGroup>
            }
        </div>
    )
}

export default connect(({ authedUser }) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({ token: authedUser.token, isAdmin: authedUser.isAdmin, userId })
})(Post);
