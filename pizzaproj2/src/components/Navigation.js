import React, { useState } from 'react'
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { useSelector } from "react-redux"
import { updateCounter } from '../redux/actions';
import { useNavigate } from 'react-router';

export default function Navigation() {
    const state = useSelector(state => state.cartCount)
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.clear();
        navigate('/');
    }
    return (
        <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand><Image src="./PizzaImg/crazyfood.png" width="70px" height="70px" ></Image>
                    <span className="ml-5 text-white"> Crazy Foodie</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">
                    <Nav className="text-white">
                        <Nav.Link href="/dash" className="ms-3 text-white">Menu</Nav.Link>
                        <Nav.Link href="/cart" className="ms-3 text-white">Cart <span className="bg-secondary rounded text-white p-1">{state.count}</span></Nav.Link>

                        {/* {JSON.parse(localStorage.getItem('cart')).length} */}
                        <Nav.Link href="/profile" className="ms-3 text-white">Profile</Nav.Link>
                        <Nav.Link className="btn border ms-3 text-white" onClick={() => LogOut()}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
