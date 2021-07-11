import React, {useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {StyledGroup, StyledGroup2, StyledHeader} from '../formStyle'
import {toast} from 'react-toastify';
import axios from 'axios'
import {addPost} from "../../utils/api";

function AddPostModal(props) {
    const [text, setText] = useState("")
    const [postValidated, setPostValidated] = useState(false);
    const [postImage, setPostImage] = useState([])

    const {show, setShow, companyId, token, setPosts} = props;

    const handleAddPost = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            const urlList = []
            const upload = postImage.map(img => {
                const formData = new FormData()
                formData.append("file", img);
                formData.append("upload_preset", "pnwecikc");
                return axios.post("https://api.cloudinary.com/v1_1/dyhfbrmbx/image/upload", formData).then((response) => {
                    urlList.push(response.data.url)
                }).catch(error => {
                    console.log(error)
                })
            })
            axios.all(upload).then(() => {
                addPost(text, urlList, companyId, token).then((v) => {
                    setPosts(posts => [...posts, v])
                    setText("")
                    setPostImage([])
                })
                    .catch(error => {
                        console.log(error)
                    })
                setShow(false);
                toast.success("Added Post Successfully!", {position: toast.POSITION.TOP_CENTER})
            }).catch(error => {
                console.log(error)
            })
        }
        setPostValidated(true)
        e.preventDefault();
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Form noValidate validated={postValidated} onSubmit={handleAddPost}>
                <StyledHeader>Create Post</StyledHeader>
                <StyledGroup>
                    <Form.Label>Text</Form.Label>
                    <Form.Control required as="textarea" rows={3} placeholder="Enter post text" value={text}
                                  onChange={e => setText(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">Post body can't be empty.</Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </StyledGroup>
                <StyledGroup>
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="file" multiple
                                  onChange={e => setPostImage(postImage => [...postImage, ...e.target.files])}/>
                </StyledGroup>
                <StyledGroup2>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </StyledGroup2>
            </Form>
        </Modal>

    )
}

export default AddPostModal
