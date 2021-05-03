import React from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {handleLogin} from "../actions/authedUser";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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
            alert("bad login attempt");
            alert(e);
        }));
    };
    if(loggedIn) return <Redirect to='/'/>;

    return (
        <div>
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={name}
                                      onChange={e => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pass}
                                      onChange={e => setPass(e.target.value)}/>
                    </Form.Group>

                    {/*TODO (dardery): implement keep me logged in*/}
                    <Form.Group>

                        <Form.Check type="checkbox" label="Keep me logged in" value={keep}
                                    onChange={e => setKeep(e.target.value)}/>

                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default connect((state) => {
    const {authedUser} = state;
    return ({loggedIn: !!authedUser.userInfo});
})(Login);