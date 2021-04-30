import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getAllCompanies} from '../utils/api'

const CompanyPages = () => {


    const [companies, setCompanies] = useState([]);


    useEffect(() => {
        getAllCompanies().then(res => setCompanies(res));
    },[]);

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
