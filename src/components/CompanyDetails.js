import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'

const CompanyDetails = (companies) => {
    const compId = useParams();
    const company = companies.find( p => p.companyId === Number(compId));
    let result;
    if(company){
        result = (
            <div>
              <h1>{company.name}</h1>
            </div>
          );
    }
    else{
        result = (
            <div>
              <h1>not found</h1>
            </div>
          );
    }

    useEffect(() => {
        console.log("I am here")
      }, []);
    return (
        <div>
            {result}
        </div>
    )
}

export default CompanyDetails
