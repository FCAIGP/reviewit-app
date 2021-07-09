import {React, useEffect, useState} from 'react'
import {getReview, getUser, getVotes, Upvote, DownVote, getReplies, addReply} from '../utils/api'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Modal, Button} from 'react-bootstrap'
import Reply from './Reply'

const Review = ({id, authorId, token}) => {

    const [review, setReview] = useState({})
    const [author, setAuthor] = useState(null)
    const [votes, setVotes] = useState(null)
    const [replies, setReplies] = useState([])
    

    const [showAddReply, setShowAddReply] = useState(false)

    const AddReplyClose = () => setShowAddReply(false)
    const AddReplyShow = () => setShowAddReply(true)
    // Add reply
    const [replyBody, setReplyBody] = useState("")


    function handleUpvote(id){
        Upvote(id, token).then(res => {
            toast.success(res.message, {position:toast.POSITION.TOP_CENTER})
        })
        .catch((error) => {
            toast.error("You are not authorized to perform voting, Please log in!",{position:toast.POSITION.TOP_CENTER})
        })
    }

    function handleDownVote(id){
        DownVote(id, token).then(res => {
            toast.success(res.message, {position:toast.POSITION.TOP_CENTER})
        })
        .catch((error) => {
            toast.error("You are not authorized to perform voting, Please log in!",{position:toast.POSITION.TOP_CENTER})
        })
    }

    const handleAddReply = (e) =>{
        e.preventDefault();
        addReply(id, replyBody, token).then(v => setReplies(replies => [...replies, v]))
        AddReplyClose()
        toast.success("Added Reply Successfully!", {position:toast.POSITION.TOP_CENTER})
    }

    useEffect(() => {
        getReview(id).then(res => setReview(res))
        if(authorId) getUser(authorId).then(res => setAuthor(res))
        getVotes(id).then(res => setVotes(res))
        getReplies(id).then( res => setReplies(res))
    },[id]);

    return (


        <div>

            <Modal show = {showAddReply} onHide = {AddReplyClose}>
                <Form>
                    <Form.Group>
                        <Form.Label>Body</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={e => setReplyBody(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleAddReply}>
                        Submit
                </Button>
                </Form>
            </Modal>

            <ToastContainer autoClose={3000} />
            {
                author ? <p>Author : {author.firstName}</p> : <p>Author : Anonymous</p>
            }
            <p>Created at: {review.created}</p>
            <p>Body: {review.body}</p>
            {
                review.contact ? <p>Contact info: {review.contact}</p> : <p>Contact Info: None</p>
            }
            <button onClick={() => handleUpvote(id)}>Upvote</button>
            <button onClick={() => handleDownVote(id)}>Downvote</button>
            <button onClick = {AddReplyShow}>Add reply</button>
            <div class="col-md-10 col-sm-10">
                <h4>Replies</h4>
                {
                    replies.map(reply => (
                        <div key={reply.replyId}>
                            <Reply id = {reply.replyId} replyAuthorId = {reply.authorId} />
                            <br></br>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(Review);
