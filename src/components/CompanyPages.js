import React, {useEffect, useState} from 'react'
import {Container, Table , Row} from 'react-bootstrap'
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
        <Container>
            <Container>
                <br/>
                <h1>Company List</h1>
                <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder=" search company"/>
                <br/>
                <br/>
            </Container>

            <Container>
                {/* todo : adjust loading spinner place */}
                {loading ? <Spinner animation="border" /> : <></>}
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Company Name</th>
                        <th>Headquarters</th>
                        <th>Region</th>
                        <th>Go to</th>
                    </tr>
                    </thead>
                    <tbody>
                    {companies.filter(company => company.name.includes(search)).map((company) => (
                        <tr key={company.companyId}>
                            <td><img src={company.logoURL} width="auto" height="45px"/> </td>
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
            </Container>
        </Container>
    )
}

export default CompanyPages
