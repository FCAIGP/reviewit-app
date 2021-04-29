import React, {useEffect, useState} from 'react'
import {getCompany} from '../utils/api'

const CompanyDetails = ({match}) => {

    const [company, setCompany] = useState({})

    useEffect(() => {
        getCompany(match.params.companyId).then(res => setCompany(res));
    });

    return (
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
        </div>
    )
}

export default CompanyDetails
