import React, { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';



export class Login extends Component {
    USER = axios.create({ baseURL: 'http://localhost:6969' });
    constructor(props) {
        super(props);
        this.state = { flag: 0 }
    }

    async componentDidMount() {
        if (localStorage.getItem('credentials') != undefined) {
            this.setState({ flag: 1 });
        }
        console.log('in login');
    }
    validate() {


        this.USER.get(`/getUser/${document.getElementById('mail').value}`)
            .then(res => {
                console.log(res.data);
                // console.log(res.data[0]["password"]);

                if (!res.data[0]) {
                    alert("Enter Valid Email or Register")
                }
                else if (res.data[0].password == document.getElementById('pass').value) {
                    console.log(document.getElementById('mail').value);
                    let arr = [document.getElementById('mail').value, res.data[0]];
                    localStorage.setItem('credentials', JSON.stringify(arr));
                    localStorage.setItem('cart', JSON.stringify([]));
                    this.setState({ flag: 1 });
                }
                else {
                    alert("Enter Proper Passcode")
                }

            })
    }

    render() {
        return (
            <div id="formpage">
                <header id="main-header">
                    <section>
                        <img src="./PizzaImg/crazyfood.png" alt="CrazyFood_logo" />
                        <h1>Crazy<span>Foodie</span></h1>
                    </section>
                </header>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {
                            my: '1rem',
                            mx: '10rem',
                            width: '100ch'
                        }
                    }}
                    autoComplete="off"
                    style={{ marginTop: "10%" }}
                >
                    <h1 className="my-4">Enter Your Credentials</h1>
                    <TextField label="Outlined secondary" id='mail' label="Enter Your Email" color="secondary" />
                    <TextField label="Outlined secondary" id='pass' label="Enter Your Passcode" color="secondary" />
                    <Button className="mb-2" variant="contained" onClick={() => this.validate()}>Log In</Button>
                    <br />
                    <Link style={{ color: 'blue' }} to="/regis">Register User</Link>
                </Box>
                {this.state.flag == 1 && <Navigate to='/dash' />}
            </div>
        )
    }
}
export default Login