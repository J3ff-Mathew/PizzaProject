import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Navigation from './Navigation'
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [menu, setMenu] = useState([]);
    const menuItems = axios.create({ baseURL: "http://localhost:6969/getMenu" });
    useEffect(() => {
        dispatch({ type: "update" });
        menuItems.get().then(res => {
            setMenu(res.data);
            console.log(res.data);
        })
        console.log(menu);
    }, []);

    const addPizza = (pizza) => {
        let arr = JSON.parse(localStorage.getItem('cart'));
        var flag = true;
        for (let i = 0; i < arr.length; i++) {
            if (pizza.name == arr[i].name)
                flag = false;
            console.log(flag);
        }
        console.log(flag);
        if (flag) {
            arr.push({ ...pizza, quantity: 1 })
        }

        localStorage.setItem('cart', JSON.stringify(arr));
        dispatch({ type: "update" });


    }
    return (
        <div>
            {JSON.parse(localStorage.getItem('credentials')) != undefined ?
                <>
                    <Navigation />
                    <Container>
                        <Row className="d-flex justify-content-center">
                            {menu != [] && menu.map(element =>
                                <Col className="m-3" xs={3}>
                                    <Card>
                                        <Card.Img variant="top" src={element.path} />
                                        <Card.Body>
                                            <Card.Title>{element.name}</Card.Title>
                                            <Card.Text>
                                                Price: &#8377;{element.price}

                                            </Card.Text>
                                            <Button variant="primary" onClick={() => addPizza(element)}>Add To Cart</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                            }
                        </Row>
                    </Container>
                </> :
                <h1>Error 404: Not Supposed To be HEre XD</h1>
            }
        </div>
    )
}
