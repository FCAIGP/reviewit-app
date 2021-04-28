import React from 'react'
import {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import  {getAllCompanies} from '../utils/api'

const CompanyPages = () => {


    const [companies, setCompanies] = useState([]);

    
    const fetchCompanies = async ()=>{
        getAllCompanies().then(function(response){
            setCompanies(response)
        })
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
