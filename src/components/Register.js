import React from 'react';
import {Button, Container, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleRegister} from '../actions/authedUser';

function Register(props) {
    const [userName, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [currentJob, setCurrentJob] = React.useState("");
    const [currentCompanyId, setCurrentCompanyId] = React.useState("");
    const [dateHired, setDateHired] = React.useState(Date.now());
    const [bio, setBio] = React.useState("");
    const [image, setImage] = React.useState("");

    const {dispatch, history, loggedIn} = props;

    //TODO: client side verification
    const handleSubmit = (e) => {
        e.preventDefault();
        const dto = {
            userName,
            email,
            password,
            firstName,
            lastName,
            currentJob,
            currentCompanyId,
            dateHired,
            bio,
            image
        };
        if(dto.currentCompanyId === "") dto.currentCompanyId = null;
        dispatch(handleRegister(dto, () => {
            history.push('/login');
        }, (e) => {
            //TODO: show what exactly went wrong
            alert("bad register attempt");
            alert(e);
        }));
    };
    if (loggedIn) return <Redirect to='/'/>;

    return (
        <div>
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={userName}
                                      onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email}
                                      onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>FirstName</Form.Label>
                        <Form.Control type="text" placeholder="First Name" value={firstName}
                                      onChange={e => setFirstName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>LastName</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" value={lastName}
                                      onChange={e => setLastName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CurrentJob</Form.Label>
                        <Form.Control type="text" placeholder="Current Job" value={currentJob}
                                      onChange={e => setCurrentJob(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>CurrentCompanyId</Form.Label>
                        <Form.Control type="text" placeholder="Current Company Id" value={currentCompanyId}
                                      onChange={e => setCurrentCompanyId(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>DateHired</Form.Label>
                        <Form.Control type="date" placeholder="Date Hired" value={dateHired}
                                      onChange={e => setDateHired(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control type="text" placeholder="Bio" value={bio}
                                      onChange={e => setBio(e.target.value)}/>
                    </Form.Group>
                    {/*TODO: upload image*/}
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Image" value={image}
                                      onChange={e => setImage(e.target.value)}/>
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
})(Register);