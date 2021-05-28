import React from 'react'
import {useEffect, useState} from 'react'
import {getReply, getUser} from '../utils/api'

const Reply = ({id, replyAuthorId}) => {

    const [reply, setReply] = useState(null)
    const [replyAuthor, setReplyAuthor] = useState(null)

    {/*Check error, state is always null, this isnt working and rendering the details of reply gives exception*/}
    useEffect(() => {
        getReply(id).then(res => setReply(res))
        getUser(replyAuthorId).then(res => setReplyAuthor(res))
    },[id]);

    return (
        <div>
            {/* <p>Reply Author: {replyAuthor.firstName}</p>
            <p>Created at: {reply.date}</p>
            <p>Body: {reply.body}</p> */}
        </div>
    )
}

export default Reply
