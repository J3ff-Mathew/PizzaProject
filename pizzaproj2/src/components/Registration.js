
import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { Container, Form, FormControl, FormLabel, Row, Col, Alert } from 'react-bootstrap';
import { Navigate } from 'react-router';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios'

export default function Registration() {

    const USER = axios.create({ baseURL: 'http://localhost:6969/adduser' });
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const regexname = RegExp(/^[A-Za-z]{2,30}$/);
    const regForPhone = RegExp(/^[7-9][0-9]{9}$/);
    const regexpass = RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()]).{8,}");
    const [pflag, setFlag] = useState(0);
    const [error, setError] = useState({ name: '', email: '', cpass: '', pass: '', fields: '', phone: '' });
    const [show, setShow] = useState(false);
    const fNameInput = useRef(null);
    const lNameInput = useRef(null);
    const phoneInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const cPassInput = useRef(null);
    function validate() {
        if (fNameInput.current.value == '' || lNameInput.current.value == '' || emailInput.current.value == '' || passInput.current.value == '' || cPassInput.current.value == '' || phoneInput.current.value == '') {
            setError({ ...error, fields: 'All fields are necessary' });
            setShow(true);
        }
        else {
            error.fields = '';
            error.name = (!regexname.test(fNameInput.current.value) || !regexname.test(lNameInput.current.value)) ? "Both Name Field should contain a minimum of 3 characters and should contain only alphabets" : "";

            error.email = (!regForEmail.test(emailInput.current.value)) ? "Enter valid email" : "";
            error.pass = (!regexpass.test(passInput.current.value)) ? error.pass = "Password should must have atlesr 8 characters be Alphanumeric and contain 1 uppercase & 1 lowercase with a special char" : "";
            error.cpass = (passInput.current.value != cPassInput.current.value) ? "Password and confirm password must be same" : "";
            error.phone = (!regForPhone.test(phoneInput.current.value)) ? "Enter valid Phone No" : "";
            setError({ ...error })
            if (error.name == "" && error.email == "" && error.cpass == "" && error.pass == "" && error.fields == "") {
                addUser();

            }
        }
    }
    async function addUser() {
        await USER.post(``, {
            "email": emailInput.current.value,
            "password": passInput.current.value,
            "name": `${fNameInput.current.value} ${lNameInput.current.value}`,
            "phone": phoneInput.current.value
        }).then(res => { setError({ ...error, fields: res.data.error }); setShow(true); })

        fNameInput.current.value = '';
        lNameInput.current.value = '';
        passInput.current.value = '';
        emailInput.current.value = '';
        phoneInput.current.value = '';
        cPassInput.current.value = '';
        setFlag(1);
    }
    return (
        <div id="formpage">
            <header id="main-header">
                <section>
                    <img src="./PizzaImg/crazyfood.png" alt="CrazyFood_logo" />
                    <h1>Crazy<span>Foodie</span></h1>
                </section>
            </header>
            {show && <Alert id="alert" variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You some an error!</Alert.Heading>
                <p>
                    {error.fields}
                </p>
            </Alert>}
            <Container style={{ marginTop: "10%" }} >

                <Row >
                    <Col>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <TextField id="standard-basic" style={{ width: '100%' }} label="Enter first name" inputRef={fNameInput} variant="standard" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formBasicEmail">
                                        <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Last name" inputRef={lNameInput} variant="standard" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.name}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Email" inputRef={emailInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.email}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Phone No" inputRef={phoneInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.phone}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Enter Password" inputRef={passInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.pass}
                                </Form.Text>
                            </Row>
                            <Row >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <TextField id="standard-basic" style={{ width: '100%' }} label="Confirm Password" inputRef={cPassInput} variant="standard" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Text className="text-danger">
                                    {error.cpass}
                                </Form.Text>
                            </Row>
                            <Button className="mx-1 mb-4" variant="contained" onClick={() => validate()}  >Register</Button>
                            <br />
                            <Link style={{ color: 'blue' }} to="/">Login Over Here</Link>
                            {pflag == 1 && <Navigate to='/' />}

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
