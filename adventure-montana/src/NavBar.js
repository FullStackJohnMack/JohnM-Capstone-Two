import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loggedOut } from './actions/usersActions';

function NavBar () {

    const history = useHistory();
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(loggedOut());
        history.push('/');
    }

    const users = useSelector(store => store.users);


    return (
        <div className="shadow-lg bg-transparent">
            <Navbar variant="light" bg="light">
                <Navbar.Brand href="/">Adventure Montana</Navbar.Brand>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/adventures">Adventures</Nav.Link>
                {users.username ? <Nav.Link as={Link} to="/adventures/add">Add an Adventure</Nav.Link> : null }
                {users.username ? null : <Nav.Link as={Link} to="/users/new">Register</Nav.Link>}
                {users.username ? <Nav.Link as={Link} to="#" onClick={logout}>{`Logout (${users.username})`}</Nav.Link> : <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            </Navbar>
        </div>
    )
}

export default NavBar;