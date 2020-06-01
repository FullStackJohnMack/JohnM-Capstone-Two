/**
 * Component that contains a form to login to the app
 */

 import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from './actions/usersActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function Login () {

    const history = useHistory();

    const dispatch = useDispatch();

    const users = useSelector(store => store.users);

    const INITIAL_STATE = {
        username:'',
        password:''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    //handles changes to controlled form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    //bounces logged in user away from login form
    if (users.username) {
        history.push('/');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }
    
    return (
        <Container>
            <Form onSubmit={handleSubmit}>
            <h3>Login</h3>
                <Form.Group controlId="loginForm.username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="loginForm.password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}/>
                </Form.Group>

                <Button type="submit" variant="success">Login</Button>
                <Button onClick={history.goBack}>Cancel</Button>
            </Form>
        </Container>
    )
}

export default Login;