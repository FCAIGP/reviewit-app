import React from 'react'
import {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const CompanyPages = () => {


    const [companies, setCompanies] = useState([]);

    //TODO (abdelrahman): try to use api call in api.js file 'getAllCompanies'
    const fetchCompanies = async ()=>{
        const response = await fetch("https://localhost:44300/api/company");
        const data = await response.json()
        setCompanies(data);
        // console.log(data);
        // console.log(companies);
    }

    useEffect(() => {
        fetchCompanies();
      }, []);

    return (
        <div>
            <h1>Company List</h1>
            <Table borderless>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Headquarters</th>
                        <th>Region</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map((company) => (
                        <tr key={company.companyId}>
                            <td>{company.name}</td>
                            <td>{company.headquarters}</td>
                            <td>{company.region}</td>
                            <td>
                            <Link to={`/company/${company.companyId}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </div>
    )
}

export default CompanyPages
