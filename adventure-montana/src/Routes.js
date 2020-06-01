/**
 * Component handles various app routes
 */

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import AdventureList from './AdventureList';
import AddAdventure from './AddAdventure';
import Adventure from './Adventure';
import Login from './Login';
import EditAdventure from './EditAdventure';
import RegisterForm from './RegisterForm';
import { useSelector } from 'react-redux';

function Routes () {

    const users = useSelector(store => store.users);

    return (
        <Switch>
            <Route exact path="/adventures/add">{users.username ? <AddAdventure/> : <Redirect to="/login"/>}</Route>
            <Route exact path="/adventures/:adventure_id/edit">{users.username ? <EditAdventure/> : <Redirect to="/login"/>}</Route>
            <Route exact path="/adventures/:adventure_id"><Adventure/></Route>
            <Route exact path="/adventures"><AdventureList/></Route>
            <Route exact path="/users/new">{users.username ? <Redirect to="/"/> : <RegisterForm/>}</Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/"><Home/></Route>
            <Redirect to="/"/>
        </Switch>
    )
}

export default Routes;