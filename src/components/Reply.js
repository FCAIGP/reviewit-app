import React from 'react'
import {useEffect, useState} from 'react'
import {getReply, getUser} from '../utils/api'
import {Comment} from "semantic-ui-react";
import moment from "moment";
import {defaultAvatar} from "./Review";

const Reply = ({id, replyAuthorId}) => {

    const [reply, setReply] = useState(null)
    const [replyAuthor, setReplyAuthor] = useState(null)

    useEffect(() => {
        getReply(id).then(res => setReply(res))
        getUser(replyAuthorId).then(res => setReplyAuthor(res))
    },[id, replyAuthorId]);

    return (
        <Comment>
            <Comment.Avatar src={defaultAvatar} />
            <Comment.Content>
                <Comment.Author as='a'>{replyAuthor ? <span>{replyAuthor.firstName} </span> : <span>Anonymous</span>}</Comment.Author>
                <Comment.Metadata>
                    {reply && moment.utc(reply.date).fromNow()}
                </Comment.Metadata>
                <Comment.Text>{reply && reply.body}</Comment.Text>
            </Comment.Content>
        </Comment>
    )
}

export default Reply
