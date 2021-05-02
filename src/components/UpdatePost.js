import React from 'react'
import {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {updatePost} from '../utils/api'
import {connect} from 'react-redux'

const UpdatePost = (props) => {

    const [text, setText] = useState("")
    const [images, setImages] = useState("")

    const handleUpdate = (e) =>{
        e.preventDefault();
        updatePost(props.match.params.postId, text, images, props.match.params.companyId, props.token)
    }

    return (
        <div>
           <Form>
                <Form.Group>
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" rows={3} value={text} onChange={e => setText(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Images</Form.Label>
                    <Form.Control type="text" placeholder="array of strings for now" value ={images} 
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
