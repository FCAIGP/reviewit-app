import {Navbar, Nav} from 'react-bootstrap'
import React from 'react'
import {Link, NavLink} from 'react-router-dom'
const BootstrapNav = () => {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">ReviewIt</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as= {Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/company">Company List</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default BootstrapNav
