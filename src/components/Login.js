import React from 'react';
import {Button, Container, Form, Col, Row} from 'react-bootstrap';
import {handleLogin} from "../actions/authedUser";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(props) {
    const [name, setName] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [keep, setKeep] = React.useState(false);

    const {dispatch, history, loggedIn} = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(name, pass, keep, () => {
            history.push('/');
        }, (e) => {
            //TODO (Abdelrahman): clear password, show error, etc...
            toast.error('Bad Login attempt, kindly re-check your credentials!', {position:toast.POSITION.TOP_CENTER})
            //alert("bad login attempt");
            //alert(e);
        }));
    };


    if(loggedIn) return <Redirect to='/'/>;

    return (
        <div className="Login">
            <ToastContainer autoClose={3000} />
            <Container>
            <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Login</h1>
            <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                <Form>
                    <Form.Group size="lg">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={name}
                                      onChange={e => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group size="lg">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pass}
                                      onChange={e => setPass(e.target.value)}/>
                    </Form.Group>

                    {/*TODO (dardery): implement keep me logged in*/}
                    <Form.Group size="lg">

                        <Form.Check type="checkbox" label="Keep me logged in" value={keep}
                                    onChange={e => setKeep(e.target.value)}/>

                    </Form.Group>

                    <Button variant="success btn-block" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
                </Col>
                </Row>
            </Container>
        </div>
    );
}

export default connect((state) => {
    const {authedUser} = state;
    return ({loggedIn: !!authedUser.userInfo});
})(Login);