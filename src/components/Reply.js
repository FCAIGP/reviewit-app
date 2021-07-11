import React from 'react'
import {useEffect, useState} from 'react'
import {getReply, getUser} from '../utils/api'

const Reply = ({id, replyAuthorId}) => {

    const [reply, setReply] = useState(null)
    const [replyAuthor, setReplyAuthor] = useState(null)

    useEffect(() => {
        getReply(id).then(res => setReply(res))
        getUser(replyAuthorId).then(res => setReplyAuthor(res))
    },[id, replyAuthorId]);

    return (
        <div>
            {replyAuthor ? <p>Reply Author: {replyAuthor.firstName} </p> : <></>}
            {reply?
            <div> 
             <p>Created at: {reply && reply.date}</p>
             <p>Body: {reply && reply.body}</p> </div> : 
             <></>}
        </div>
    )
}

export default Reply
