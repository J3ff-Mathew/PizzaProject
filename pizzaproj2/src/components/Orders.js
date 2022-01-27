import React, { useEffect, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Container, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Orders() {
    const ORDER = axios.create({ baseURL: 'http://localhost:6969/addorder' });
    const location = useLocation();
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [order, setOrder] = useState([]);
    const cardno = useRef(null);
    const cvv = useRef(null);
    const regexForCardno = RegExp(/^[0-9]{16}$/);
    const regexForCvv = RegExp(/^([0-9]{3})$/);
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('credentials')));
        setOrder(JSON.parse(localStorage.getItem('cart')));
    }, []);
    const validateCard = () => {
        let cardNumber = cardno.current.value;
        let cvvNumber = cvv.current.value;
        if (!regexForCardno.test(cardNumber) && regexForCvv.test(cvvNumber)) {
            ORDER.post('', { username: user[1].name, email: user[0], phone: user[1].phone, total: location.state.total, items: order })
            alert("Order has bee sucessfully placed");
            localStorage.setItem('cart', JSON.stringify([]));
            navigate('/dash')
        } else {
            console.log(!regexForCardno.test(cardNumber));
            console.log(!regexForCvv.test(cvvNumber));
            alert("Invalid Card Credentials");

        }
    }
    return (
        <div className='d-flex justify-content-center align-items-center flex-column'>
            <h1 className='text-primary' style={{ fontSize: '4rem' }}>Order Chekout</h1>
            {user[1] != undefined && order != [] &&
                <>
                    <h1 style={{ fontSize: '3rem', marginTop: '2rem' }}>User Details</h1>
                    <div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr >
                                    <th className='px-4 py-2'>Name</th>
                                    <th className='px-4 py-2'>Email</th>
                                    <th className='px-4 py-2'>Phone</th>
                                    <th className='px-4 py-2'>Grand Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='px-4 py-2'>{user[1].name}</td>
                                    <td className='px-4 py-2'>{user[0]}</td>
                                    <td className='px-4 py-2'>{user[1].phone}</td>
                                    {console.log(user[1].name)}
                                    <td className="text-success px-4 py-2"> &#8377;{location.state.total}/-</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <h1 style={{ fontSize: '3rem', marginTop: '2rem' }}>Order Details</h1>
                    <Container>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr >
                                    <th className='px-4 py-2'>Item Name</th>
                                    <th className='px-4 py-2'>Price</th>
                                    <th className='px-4 py-2'>Quantity</th>
                                    <th className='px-4 py-2'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.map(ele =>
                                    <tr>
                                        <td className='px-4 py-2'>{ele.name}</td>
                                        <td className='px-4 py-2'>&#8377;{ele.price}</td>
                                        <td className='px-4 py-2'>{ele.quantity}</td>
                                        {console.log(user[1].name)}
                                        <td className=" px-4 py-2"> &#8377;{parseInt(ele.price) * parseInt(ele.quantity)}/-</td>
                                    </tr>)}

                            </tbody>
                        </Table>
                    </Container>

                </>
            }
            <Form className="m-5">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Visa Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Card Number" ref={cardno} />
                    <Form.Text className="text-muted">
                        We'll never share your Card details with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" placeholder="Enter CVV" ref={cvv} />
                </Form.Group>
                <Button variant="primary" className="my-3" type="button" onClick={() => validateCard()}>
                    Pay
                </Button>
            </Form>
        </div>
    )
}
