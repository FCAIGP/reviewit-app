import React, {useEffect, useState} from 'react'
import {Table , Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getAllCompanies} from '../utils/api'
import {Spinner} from 'react-bootstrap'
import AddCompanyModal from './modals/AddCompanyModal'
import styled, { keyframes } from 'styled-components';
import { fadeIn  } from 'react-animations';
import { Image , Input , Header , Icon } from 'semantic-ui-react';
import {defaultImageUrl} from "./CompanyDetails";

const bounceAnimation = keyframes`${fadeIn }`;

const BouncyDiv = styled.div`
  animation: 2s ${bounceAnimation};
`;

const CompanyPages = () => {


    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [addCompanyShow, setAddCompanyShow] = useState(false)

    useEffect(() => {
        getAllCompanies().then(res => setCompanies(res));
        setLoading(false)
    },[]);

    return (
        <Container>
            <BouncyDiv>
                <Container>
                    <br/>
                    <Header as='h1'>
                        <Icon name='building'/>
                        <Header.Content>Company List</Header.Content>
                    </Header>
                    <br/>
                    <Input
                        icon={{ name: 'search', circular: true }}
                        placeholder='Search...'
                        onChange={e=>setSearch(e.target.value)}
                    />
                    <br/>
                    <br/>
                </Container>

                <Container>

                    {/* todo : adjust loading spinner place */}
                    {loading ? <Spinner animation="border" /> : <></>}
                     <AddCompanyModal show={addCompanyShow} setShow={setAddCompanyShow} setCompanies={setCompanies}/>
                     <button onClick={() => setAddCompanyShow(true)}>Add Company Page</button>
                    <Table striped bordered hover>
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
                                <td>
                                    <BouncyDiv>
                                        <Image src={company.logoURL ? company.logoURL : defaultImageUrl} spaced size='mini' verticalAlign='middle'/>{' '}
                                        <span>{company.name}</span>
                                    </BouncyDiv>
                                </td>
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
            </BouncyDiv>
        </Container>
    )
}

export default CompanyPages


