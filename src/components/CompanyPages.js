import React, {useEffect, useState} from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getAllCompanies} from '../utils/api'
import {Spinner} from 'react-bootstrap'

const CompanyPages = () => {


    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getAllCompanies().then(res => setCompanies(res));
        setLoading(false)
    },[]);

    return (
        <div>
            {/* todo : adjust loading spinner place */}
            {loading ? <Spinner animation="border" /> : <></>}
            <h1>Company List</h1>
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)}/>
            <Table borderless>
                <thead>
                <tr>
                    <th>Company Name</th>
                    <th>Headquarters</th>
                    <th>Region</th>
                    <th>Go to</th>
                </tr>
                </thead>
                <tbody>
                {companies.filter(company => company.name.includes(search)).map((company) => (
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
