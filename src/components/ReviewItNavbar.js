import {Nav, Navbar} from 'react-bootstrap'
import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {clearAuthedUser} from "../actions/authedUser";
import {connect} from 'react-redux';
class ReviewItNavbar extends Component {
    logOut_click = (e) => {
        e.preventDefault();

        const {dispatch, history} = this.props;
        dispatch(clearAuthedUser());
        history.push('/login');
    };

    render() {
        const {loggedIn, fullName, userId} = this.props;
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">ReviewIt</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/company">Company List</Nav.Link>
                    </Nav>
                    {loggedIn ? <Nav>
                        <Nav.Link as={Link} to={`/profile/${userId}`}>Hello {fullName}</Nav.Link>
                        <Nav.Link as={Link} onClick={this.logOut_click}>Log out</Nav.Link>
                    </Nav> : <Nav>
                        <Nav.Link as={Link} to="/login">Log in</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(connect(({authedUser}) => {
    const {userInfo} = authedUser;
    console.log(userInfo);
    if (!userInfo)
        return {loggedIn: false};
    else
        return {loggedIn: true, fullName: userInfo.firstName + ' ' + userInfo.lastName, userId: userInfo.userId};
})(ReviewItNavbar));
