import React from 'react'
import {useState, useEffect} from 'react'
import {getPost} from '../utils/api'

export const Post = (props) => {

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getPost(props.id).then(res => setPost(res))
        console.log(post)
        setLoading(false)
    },[]);
    
    return (
        <div>
            ss
        </div>
    )
}

export default Post
