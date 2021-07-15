import React, {useEffect, useState} from 'react'
import {Table , Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getAllCompanies} from '../utils/api'
import {Spinner} from 'react-bootstrap'
import AddCompanyModal from './modals/AddCompanyModal'
import styled, { keyframes } from 'styled-components';
import { fadeIn  } from 'react-animations';
import { Image , Input , Header , Button , Icon , Card } from 'semantic-ui-react';
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
                    <AddCompanyModal show={addCompanyShow} setShow={setAddCompanyShow} setCompanies={setCompanies}/>
                    <Button primary icon="add" onClick={() => setAddCompanyShow(true)} content="Add Company Page"/>
                    <br/>
                    <br/>
                    <Input fluid
                           icon={{ name: 'search', circular: true }}
                           placeholder='Search...'
                           onChange={e=>setSearch(e.target.value)}
                    />
                    <br/>
                </Container>

                <Container>

                    {/* todo : adjust loading spinner place */}
                    {loading ? <Spinner animation="border" /> : <></>}
                    <Card.Group itemsPerRow={4}>
                        {companies.filter(company => company.name.includes(search)).map((company) => (
                            <Card
                                image={company.logoURL ? company.logoURL : defaultImageUrl}
                                header={company.name}
                                meta={company.region}
                                description={company.headquarters}
                                extra={ <div style={{textAlign: "center"}}>
                                    <Link to={`/company/${company.companyId}`}>View Company</Link>
                                </div>
                                }
                            />
                        ))}
                    </Card.Group>
                </Container>
            </BouncyDiv>
        </Container>
    )
}

export default CompanyPages


