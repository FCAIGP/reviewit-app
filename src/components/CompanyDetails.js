import React from 'react'
import {useEffect, useState} from 'react'

const CompanyDetails = ({match}) => {

    //TODO (abdelrahman): try to use api call in api.js file 'getCompany'
    const [company, setCompany] = useState({})

    const fetchCompany = async () =>{
      const response = await fetch(`https://localhost:44300/api/company/${match.params.companyId}`)
      const comp = await response.json()
      setCompany(comp)
    }

    useEffect(() => {
        fetchCompany()
      }, []);

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
