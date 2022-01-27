import React, { useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Navigation from './Navigation'

export default function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('credentials')));
    return (
        <div>
            <Navigation />
            <Container  >
                <h1 className='text-primary my-5 text-center' style={{ fontSize: '3rem' }}> Profile Info</h1>
                <Table striped bordered hover size="sm">
                    <tbody>
                        <tr >
                            <th className='px-4 py-2'>Name</th>
                            <td className='px-4 py-2'>{user[1].name}</td>
                        </tr>
                        <tr>
                            <th className='px-4 py-2'>Email</th>
                            <td className='px-4 py-2'>{user[0]}</td>
                        </tr>
                        <tr>
                            <th className='px-4 py-2'>Phone</th>
                            <td className='px-4 py-2'>{user[1].phone}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
