/**
 * Component containing form which registers a user
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { registerUser } from './actions/usersActions';

function RegisterForm () {

    const history = useHistory();

    const dispatch = useDispatch();

    const INITIAL_STATE = {
        username:'',
        password:'',
        first_name:'',
        last_name:'',
        email:''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const users = useSelector(store => store.users);

    //bounces logged in users to home page so they can't create another user while logged in
    if (users.username) {
        history.push('/');
    }

    //handles changes to the controlled form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
        setFormData(INITIAL_STATE);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <h3>Register as a User</h3>
                <Form.Group controlId="RegisterUserForm.username">
                    <Form.Label>* Username:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder="1 or more characters"
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="RegisterUserForm.password">
                    <Form.Label>* Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        value={formData.password}
                        placeholder="6 or more characters"
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="RegisterUserForm.first_name">
                    <Form.Label>* First Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="RegisterUserForm.last_name">
                    <Form.Label>* Last Name:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="RegisterUserForm.email">
                    <Form.Label>* Email:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="email"
                        value={formData.endingLoc}
                        onChange={handleChange}/>
                </Form.Group>

                <Button type="submit" variant="success">Register</Button>
                <Button onClick={history.goBack}>Cancel</Button>
            </Form>
        </Container>
    )
}

export default RegisterForm;