import React from 'react'
import {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {updatePost} from '../utils/api'
import {connect} from 'react-redux'
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePost = (props) => {

    const [text, setText] = useState("")
    const [images, setImages] = useState("")

    const handleUpdate = (e) =>{
        e.preventDefault();
        updatePost(props.match.params.postId, text, images.split('\s*,\s*'), props.match.params.companyId, props.token)
        props.history.push(`/company/${props.match.params.companyId}`)
        toast.success("Post Updated Successfuly!",{position:toast.POSITION.TOP_CENTER})
    }

    return (
        <div>
           <Form>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={props.location.text} onChange={e => setText(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="text" placeholder="array of strings for now" defaultValue ={props.location.images} 
                                                        onChange={e => setImages(e.target.value)}/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleUpdate}>
                    Submit
                </Button>
           </Form>
        </div>
    )
}

export default connect(({authedUser}) => {
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin})
})(UpdatePost);
