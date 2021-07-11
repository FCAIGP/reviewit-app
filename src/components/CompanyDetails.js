import {Spinner} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import {getCompany, getPosts, getReviews} from '../utils/api'
import {connect} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsList from './company_details/PostsList';
import ReviewsList from './company_details/ReviewsList';
import ClaimRequestModal from "./modals/ClaimRequestModal";

const CompanyDetails = ({match, token, userId, isAdmin}) => {

    const [company, setCompany] = useState({})
    const [posts, setPosts] = useState([])
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)


    const [showClaimRequest, setShowClaimRequest] = useState(false)

    useEffect(() => {
        getCompany(match.params.companyId).then(res => setCompany(res));
        getPosts(match.params.companyId).then(res => setPosts(res));
        getReviews(match.params.companyId).then(res => setReviews(res));
        setLoading(false)
    }, [match.params.companyId]);

    return (
        <div>
            <ToastContainer autoClose={3000}/>
            {/* todo : adjust loading spinner place */}
            {loading && <Spinner animation="border"/>}
            <div>
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
            </div>
            {
                !company.ownerId &&
                <button onClick={() => setShowClaimRequest(true)}>Claim Ownership of Company</button>
            }
            <ClaimRequestModal show={showClaimRequest} setShow={setShowClaimRequest} companyId={company.companyId}
                               token={token}/>

            <br/>

            <PostsList posts={posts} companyId={company.companyId} ownerId={company.ownerId} userId={userId} token={token} setPosts={setPosts}/>
            <ReviewsList companyId={company.companyId}reviews={reviews} userId = {userId} isAdmin={isAdmin} setReviews={setReviews}/>
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
