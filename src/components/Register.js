import axios from 'axios';
import React from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleRegister } from '../actions/authedUser';
import {uploadImages} from '../utils/api'
import {toast, ToastContainer} from 'react-toastify'

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
    const [image, setImage] = React.useState([]);

    const { dispatch, history, loggedIn } = props;

    //TODO: client side verification
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlList = []
        const upload =  uploadImages(image, urlList.push.bind(urlList))
        axios.all(upload).then(()=>{
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
                image : urlList[0]
            };
            if (dto.currentCompanyId === "") dto.currentCompanyId = null;
            dispatch(handleRegister(dto, () => {
                toast.success("Registered Successfuly!", { position: toast.POSITION.TOP_CENTER })
                history.push('/login');
                setImage([])
            }, (e) => {
                //TODO: show what exactly went wrong
                toast.error("Registeration Failed!", { position: toast.POSITION.TOP_CENTER })
            }));
        }).catch(()=>{
            toast.error("Failed to upload profile image!", { position: toast.POSITION.TOP_CENTER })
        })
    };
    if (loggedIn) return <Redirect to='/' />;

    return (
        <div>
            <ToastContainer autoClose={3000}/>
            <Container>
                <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Register</h1>
                <Row className="mt-5">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
                        <Form>
                            <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" value={userName}
                                    onChange={e => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            </Row>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>FirstName</Form.Label>
                                <Form.Control type="text" placeholder="First Name" value={firstName}
                                    onChange={e => setFirstName(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" value={lastName}
                                    onChange={e => setLastName(e.target.value)} />
                            </Form.Group>
                            </Row>
                            <Form.Group>
                                <Form.Label>CurrentJob</Form.Label>
                                <Form.Control type="text" placeholder="Current Job" value={currentJob}
                                    onChange={e => setCurrentJob(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>DateHired</Form.Label>
                                <Form.Control type="date" placeholder="Date Hired" value={dateHired}
                                    onChange={e => setDateHired(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control type="text" placeholder="Bio" value={bio}
                                    onChange={e => setBio(e.target.value)} />
                            </Form.Group>
                            {/*TODO: upload image*/}
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="file" placeholder="Image"
                                    onChange={e => setImage(image => [...image, ...e.target.files])} />
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
    const { authedUser } = state;
    return ({ loggedIn: !!authedUser.userInfo });
})(Register);