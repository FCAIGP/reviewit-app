import {React, useEffect, useState} from 'react'
import {getReview, getUser, getVotes, Upvote, DownVote, getReplies, addReply} from '../utils/api'
import {connect} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Modal, Button} from 'react-bootstrap'
import Reply from './Reply'
import { StyledHeader, StyledGroup, StyledGroup2} from './formStyle';
import {Comment, CommentGroup, Divider, Icon, Statistic} from "semantic-ui-react";
import moment from "moment";


export const defaultAvatar = "https://www.nretnil.com/avatar/LawrenceEzekielAmos.png";

const Review = ({id, authorId, token}) => {

    const [review, setReview] = useState({})
    const [author, setAuthor] = useState(null)
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
            setUpVotes(res.upvotes)
            setDownVotes(res.downvotes)
        }).catch(error => {
            console.log(error)
        })
        getReplies(id).then( res => setReplies(res)).catch(error =>{
            console.log(error)
        })
    },[authorId, id]);

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
            <CommentGroup size="large">
                <Divider/>

                <Statistic size="tiny">
                    <Statistic.Value>{upVotes - downVotes}</Statistic.Value>
                    <Statistic.Label>Votes</Statistic.Label>
                </Statistic>
                <a onClick={() => handleUpvote(id)}>
                    <Icon name="arrow up" size="large"/>
                </a>
                <a onClick={() => handleDownVote(id)}>
                    <Icon name="arrow down" size="large"/>
                </a>
                <Comment>
                    <Comment.Avatar src={author && author.image ? author.image : defaultAvatar} />
                    <Comment.Content>
                        <Comment.Author as='a'>
                            {author ? <span>{author.firstName}</span>: <span>Anonymous</span>}
                        </Comment.Author>
                        <Comment.Metadata>
                            {moment.utc(review.created).fromNow()}
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{review.body}</p>

                            {review.contact ?
                            <Comment.Metadata>
                                <span> {"Contact info: " + review.contact} </span>
                            </Comment.Metadata> : ""}
                        </Comment.Text>
                        <Comment.Actions>
                            <Comment.Action>
                                <a onClick = {AddReplyShow}>
                                    Reply
                                </a>
                            </Comment.Action>
                        </Comment.Actions>
                    </Comment.Content>


                    <Comment.Group size='mini' >
                        {replies.map(reply => (
                            <div key={reply.replyId}>
                                <Reply id = {reply.replyId} replyAuthorId = {reply.authorId} />
                            </div>
                        ))}
                    </Comment.Group>
                </Comment>
            </CommentGroup>

        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(Review);
