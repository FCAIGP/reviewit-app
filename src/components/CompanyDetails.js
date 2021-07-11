import {Spinner} from 'react-bootstrap'
import React, {Fragment, useEffect, useState} from 'react'
import {getCompany} from '../utils/api'
import {connect} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsList from './company_details/PostsList';
import ReviewsList from './company_details/ReviewsList';

import ClaimRequestModal from "./modals/ClaimRequestModal";


const CompanyDetails = ({match, token, userId, isAdmin}) => {

    const [company, setCompany] = useState({})
    const [loading, setLoading] = useState(true)


    const [showClaimRequest, setShowClaimRequest] = useState(false)

    useEffect(() => {
        setLoading(true);
        getCompany(match.params.companyId)
            .then(res => {
                setCompany(res)
                setLoading(false)
            });
    }, [match.params.companyId]);

    return (
        <div>
            <ToastContainer autoClose={3000}/>
            {/* todo : adjust loading spinner place */}
            {loading ? <Spinner animation="border"/> : <Fragment>
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

                <PostsList companyId={company.companyId} ownerId={company.ownerId} userId={userId} token={token}/>
                <ReviewsList companyId={company.companyId} userId={userId} isAdmin={isAdmin} token={token}/>
            </Fragment>
            }
        </div>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
