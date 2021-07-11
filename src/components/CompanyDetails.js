import {Spinner} from 'react-bootstrap'
import React, {Fragment, useEffect, useState} from 'react'
import {getCompany} from '../utils/api'
import {connect} from 'react-redux'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostsList from './company_details/PostsList';
import ReviewsList from './company_details/ReviewsList';
import ClaimRequestModal from "./modals/ClaimRequestModal";
import {Container, Divider, Button, Image , Header , Icon , Rating} from "semantic-ui-react";
import moment from "moment";

export const defaultImageUrl = "https://pinkladies24-7.com/assets/images/defaultimg.png";

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
        <Container>
            <br/>
            {/*<ToastContainer autoClose={3000}/>*/}
            {/* todo : adjust loading spinner place */}
            {loading ? <Spinner animation="border"/> : <div>
                <div>
                    <h1>Company Details</h1>
                    <Image src={company.logoURL ? company.logoURL : defaultImageUrl} spaced size='small' verticalAlign='middle'/>
                    <h2>{company.name}</h2>

                    <Header>
                        <Icon name='chess'/>
                        <Header.Content>
                            Headquarters: {company.headquarters}
                        </Header.Content>
                    </Header>
                    <Header>
                        <Icon name='industry'/>
                        <Header.Content>
                            Industry: {company.industry}
                        </Header.Content>
                    </Header>
                    <Header>
                        <Icon name='world'/>
                        <Header.Content>
                            Region: {company.region}
                        </Header.Content>
                    </Header>

                    <Header>
                        <Icon name='calendar times'/>
                        <Header.Content>
                            Created Date: {moment.utc(company.createdDate).fromNow()}
                        </Header.Content>
                    </Header>

                    <Header>
                        <Icon name='radio'/>
                        <Header.Content>
                            Score up to date: {company.isScoreUpToDate ? "Yes" : "No"}
                        </Header.Content>
                    </Header>
                    <Header>
                        <Icon name='star'/>
                        <Header.Content>
                            Score: <Rating icon='star' defaultRating={company.score} maxRating={5} disabled/>
                        </Header.Content>
                    </Header>
                    <Header>
                        <Icon name='user'/>
                        <Header.Content>
                            Close Status: {company.closeStatus}
                        </Header.Content>
                    </Header>
                    <Divider/>
                </div>

                {
                    !company.ownerId &&
                    <Button primary onClick={() => setShowClaimRequest(true)} content="Claim Ownership of Company" icon="legal"/>
                }


                <ClaimRequestModal show={showClaimRequest} setShow={setShowClaimRequest} companyId={company.companyId}
                                   token={token}/>

                <br/>

                <PostsList companyId={company.companyId} ownerId={company.ownerId} userId={userId} token={token}/>
                <ReviewsList companyId={company.companyId} userId={userId} isAdmin={isAdmin} token={token}/>
            </div>
            }
        </Container>
    )
}

export default connect(({authedUser}) => {
    const userId = authedUser.userInfo ? authedUser.userInfo.userId : null
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin, userId})
})(CompanyDetails);
