import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import {getAllClaimRequests} from '../utils/api'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";

const ClaimRequestList = ({token, isAdmin}) => {

    const [claimRequests, setClaimRequests] = useState([]);

    useEffect(() => {
        if (!token || !isAdmin) return;
        getAllClaimRequests(token).then(res => setClaimRequests(res)).catch(e=>alert(e));
    }, [token, isAdmin]);
    if (!token || !isAdmin) return <Redirect to='/'/>;
    return (
        <div>
            <h1>Claim Requests</h1>
            <Table borderless>
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Title</th>
                    <th>IdentificationCard</th>
                    <th>ProofOfWork</th>
                    <th>LinkedInAccount</th>
                    <th>ClaimStatus</th>
                </tr>
                </thead>
                <tbody>
                {/*TODO (Dardery):  add key*/}
                {
                    claimRequests.map((req) => (
                        <tr>
                            <td>{req.description}</td>
                            <td>{req.title}</td>
                            <td>{req.identificationCard}</td>
                            <td>{req.proofOfWork}</td>
                            <td>{req.linkedInAccount}</td>
                            <td>{req.claimStatus}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>

        </div>
    )
}

export default connect(({authedUser}) => {
    console.log(authedUser);
    return ({token: authedUser.token, isAdmin: authedUser.isAdmin})
})(ClaimRequestList);
