import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import {getAllClaimRequests, acceptClaimRequest, rejectClaimRequest} from '../utils/api'
import {connect} from 'react-redux'
import {Redirect} from "react-router-dom";
import {Spinner} from 'react-bootstrap'
import {toast, ToastContainer} from 'react-toastify'
const ClaimRequestList = ({token, isAdmin}) => {

    const [claimRequests, setClaimRequests] = useState([]);
    const [loading, setLoading] = useState(true)

    function Accept(id){
         acceptClaimRequest(id, token).then(v => {
             toast.success("Accepted Claim Request!", { position: toast.POSITION.TOP_CENTER })
            getAllClaimRequests(token).then(res => setClaimRequests(res)).catch(e=> console.log(v));
         }).catch(error => {
             toast.error("You are not allowed to to do this action", { position: toast.POSITION.TOP_CENTER })
         })
    }

    function Reject(id){
        rejectClaimRequest(id, token).then(v => {
            toast.success("Rejected Claim Request!", { position: toast.POSITION.TOP_CENTER })
            getAllClaimRequests(token).then(res => setClaimRequests(res)).catch(e=> console.log(v));
        })
        .catch(error => {
            toast.error("You are not allowed to to do this action", { position: toast.POSITION.TOP_CENTER })
        })
    }

    useEffect(() => {
        if (!token || !isAdmin) return;
        getAllClaimRequests(token).then(res => setClaimRequests(res)).catch(e=>alert(e));
        setLoading(false)
    }, [token, isAdmin]);
    if (!token || !isAdmin) return <Redirect to='/'/>;
    


    return (
        <div>
            {/* todo : adjust loading spinner place */}
            {loading ? <Spinner animation="border" /> : <></>}
            <ToastContainer autoClose={3000} />
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/*TODO (Dardery):  add key*/}
                {
                    claimRequests.map((req) => (
                        <tr key={req.claimRequestId}>
                            <td>{req.description}</td>
                            <td>{req.title}</td>
                            <td><img src={req.identificationCard} width="100" height="100"/></td>
                            <td><img src={req.proofOfWork} width="100" height="100"/></td>
                            <td>{req.linkedInAccount}</td>
                            <td>{req.claimStatus}</td>
                            {req.claimStatus === 2 ?
                                <>
                                    <td>Pending</td>
                                    <td>
                                        <button onClick={() => Accept(req.claimRequestId)}>Accept</button>
                                        <button onClick={() => Reject(req.claimRequestId)}>Reject</button>
                                    </td>
                                </>
                                :
                                <>
                                    <td>{req.claimStatus === 0 ? "Accepted" : "Rejected"}</td>
                                </>
                            }
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
