import {Button} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {getCompany, getPosts, deletePost, getUser} from '../utils/api'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Spinner} from 'react-bootstrap'
const CompanyDetails = ({match, token, isAdmin}) => {

    const [company, setCompany] = useState({})
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    

    function handlePostDelete(postId){
        //TODO: nadaf
        deletePost(postId, token).then(v => console.log(v))
        setPosts(posts.filter(p => p.id !== postId))
    }

    useEffect(() => {
        getCompany(match.params.companyId).then(res => setCompany(res));
        getPosts(match.params.companyId).then(res => setPosts(res));
        setLoading(false)
    },[match.params.companyId]);

    return (
        
        
        <div>
            {/* todo : adjust loading spinner place */}
            {loading ? <Spinner animation="border" /> : <></>}
            <h1>Company Details</h1>
            <p>Name: {company.name}</p>
            <p>Headquarters: {company.headquarters}</p>
            <p>Industry: {company.industry}</p>
            <p>Region: {company.region}</p>
            <p>Created Date: {company.createdDate}</p>
            <p>Logo: {company.logoURL}</p>
            <p>Score up to date: {company.isScoreUpToDate ? "Yes" : "No"}</p>
            <p>Score: {company.score}</p>
            <p>Close Status: {company.closeStatus}</p>
            <br/>
        
            <Link to={`${window.location.pathname}/addPost`}>Add Post</Link>
            <br/>
            <h1>Posts</h1>
            <br/>
            {
                posts.map(post => (
                    <>
                    <p>Text: {post.text}</p>
                    <p>Images: {post.images}</p>
                    <p>Created Date: {post.createdDate}</p>
                    <Link to={`${window.location.pathname}/updatePost/${post.postId}`} variant="primary">Update</Link>
                    <Button onClick={() => handlePostDelete(post.postId)} variant="danger">Delete</Button>
                    <br/>
                    </>
                ))
            }
        </div>
    )
}

export default connect(({authedUser}) => {
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin})
})(CompanyDetails);
