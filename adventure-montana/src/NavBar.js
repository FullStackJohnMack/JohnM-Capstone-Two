import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar () {

    return (
        <nav>
            <NavLink exact to="/">Home</NavLink>
            <NavLink exact to="/adventures">Adventures</NavLink>
            <NavLink exact to="/adventures/add">Add an Adventure</NavLink>
            <NavLink exact to="/">Login</NavLink>
        </nav>
    )
}

export default NavBar;