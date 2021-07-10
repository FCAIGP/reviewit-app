import {React, useEffect, useState} from 'react'
import {getReview, getUser, getVotes, Upvote, DownVote, getReplies, addReply} from '../utils/api'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Modal, Button} from 'react-bootstrap'
import Reply from './Reply'
import { StyledHeader, StyledGroup, StyledGroup2} from './formStyle';
const Review = ({id, authorId, token}) => {

    const [review, setReview] = useState({})
    const [author, setAuthor] = useState(null)
    const [votes, setVotes] = useState(null)
    const [replies, setReplies] = useState([])
    const [upVotes, setUpVotes] = useState(0)
    const [downVotes, setDownVotes] = useState(0)

    const [showAddReply, setShowAddReply] = useState(false)

    const AddReplyClose = () => setShowAddReply(false)
    const AddReplyShow = () => setShowAddReply(true)

    // Add reply
    const [replyBody, setReplyBody] = useState("")
    const [replyValidated, setReplyValidated] = useState(false)

    function handleUpvote(id){
        Upvote(id, token).then(res => {
            toast.success(res.message, {position:toast.POSITION.TOP_CENTER})
            getVotes(id).then((res) => {
                setVotes(res)
                setUpVotes(res.upvotes)
                setDownVotes(res.downvotes)
            }).catch(error => {
                console.log(error)
            })
        })
        .catch((error) => {
            toast.error("You are not authorized to perform voting, Please log in!",{position:toast.POSITION.TOP_CENTER})
        })
    }

    function handleDownVote(id){
        DownVote(id, token).then(res => {
            toast.success(res.message, {position:toast.POSITION.TOP_CENTER})
            getVotes(id).then((res) => {
                setVotes(res)
                setUpVotes(res.upvotes)
                setDownVotes(res.downvotes)
            }).catch(error => {
                console.log(error)
            })
        })
        .catch((error) => {
            toast.error("You are not authorized to perform voting, Please log in!",{position:toast.POSITION.TOP_CENTER})
        })
    }

    const handleAddReply = (e) =>{
        const form = e.currentTarget;
        if(form.checkValidity() === false){
            e.preventDefault();
            e.stopPropagation();
        }
        else{
            addReply(id, replyBody, token).then((v) => {
                setReplies(replies => [...replies, v])
                setReplyBody("")
            })
            .catch(error => {
                console.log(error)
            })
            AddReplyClose()
            toast.success("Added Reply Successfully!", {position:toast.POSITION.TOP_CENTER})
        }
        setReplyValidated(true)
        e.preventDefault();
    }

    useEffect(() => {
        getReview(id).then(res => setReview(res)).catch(error => {
            console.log(error)
        })
        if(authorId) getUser(authorId).then(res => setAuthor(res)).catch(error => {
            console.log(error)
        })
        getVotes(id).then((res) => {
            setVotes(res)
            setUpVotes(res.upvotes)
            setDownVotes(res.downvotes)
        }).catch(error => {
            console.log(error)
        })
        getReplies(id).then( res => setReplies(res)).catch(error =>{
            console.log(error)
        })
    },[id]);

    return (


        <div>

            <Modal show = {showAddReply} onHide = {AddReplyClose}>
                <Form noValidate validated={replyValidated} onSubmit={handleAddReply}>
                    <StyledHeader>Add Reply</StyledHeader>
                    <StyledGroup>
                        <Form.Label>Body</Form.Label>
                        <Form.Control required as="textarea" rows={3} value={replyBody} onChange={e => setReplyBody(e.target.value)} />
                        <Form.Control.Feedback type="invalid">Reply body can't be empty.</Form.Control.Feedback>
                        <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                    </StyledGroup>
                    <StyledGroup2>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </StyledGroup2>
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
            <p>Upvotes: {upVotes}</p>
            <p>DownVotes: {downVotes}</p>
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
