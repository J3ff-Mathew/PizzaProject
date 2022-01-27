import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export default function Cart() {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const [gt, setGt] = useState(0);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "update" });
        let arr = JSON.parse(localStorage.getItem('cart'));
        if (arr[0] == undefined) {
            arr = [];
        }
        else if (arr[0].quantity == undefined) {
            for (let i = 0; i < arr.length; i++) {

                arr[i] = { ...arr[i], quantity: 1 }
            }
        }

        setList([...arr]);

    }, [])

    const deletePizza = (index) => {
        list.splice(index, 1)
        setList([...list]);
        localStorage.setItem('cart', JSON.stringify(list));
        dispatch({ type: "update" });
    }
    const loadData = () => {
        let total = 0;
        for (let i = 0; i < list.length; i++) {
            document.getElementById(i).value = list[i].quantity;
            total += document.getElementById(i).value * list[i].price;
        }
        setGt(total);


    }
    const getTotal = () => {
        let total = 0;
        let invalid = false;
        for (let i = 0; i < list.length; i++) {
            // document.getElementById(i).value = 1;
            if (document.getElementById(i).value <= 0) {
                document.getElementById(i).value = 1
            }
            if (document.getElementById(i).value > 0) {
                total += document.getElementById(i).value * list[i].price;
                list[i].quantity = document.getElementById(i).value;
            }
            else
                invalid = true;
        }
        setList([...list])
        if (!invalid) {
            loadData();
            localStorage.setItem('cart', JSON.stringify([...list]))
        }
        console.log(total)
    }
    const sendData = () => {
        for (let i = 0; i < list.length; i++) {
            if (document.getElementById(i).value > 0) {
                list[i] = { ...list[i], quantity: document.getElementById(i).value }

            }
            setList([...list])
            localStorage.setItem('cart', JSON.stringify([...list]))
        }
        navigate('/order', { state: { total: gt } })

    }
    return (
        <div onLoad={() => loadData()}>
            <Navigation />
            {list != [] ?
                <div>
                    {list.map((ele, index) =>
                        <Card className="my-4">
                            <Card.Header as="h5">{ele.name}</Card.Header>
                            <Card.Body className='d-flex justify-content-around flow-row align-items-center'>
                                <Card.Img variant="left" src={ele.path} style={{ height: "100px", width: "200px" }} />
                                <Card.Title className="text-danger">  Price: &#8377; {ele.price}</Card.Title>
                                <input type="number" id={index} style={{ width: '3rem' }} onBlur={() => getTotal()} min='1' />
                                <Button variant="danger" onClick={() => deletePizza(index)}>Delete</Button>


                            </Card.Body>
                        </Card>)}
                    < div className="d-flex justify-content-around align-items-center">
                        <div className="text-success" style={{ fontSize: '2.2rem' }}>
                            Grand Total : &#8377;{gt}/-
                        </div>
                        <Button variant="dark" className="m-5 px-5 py-3" onClick={() => sendData()}>Checkout =&gt;</Button>
                    </div>
                </div>
                :
                <h1>No items in Cart</h1>
            }


        </div>
    )
}
