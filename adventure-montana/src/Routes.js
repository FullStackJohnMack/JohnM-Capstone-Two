import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import AdventureList from './AdventureList';
import AddAdventure from './AddAdventure';
import Adventure from './Adventure';

function Routes () {
    return (
        <Switch>
            <Route exact path="/adventures/add"><AddAdventure/></Route>
            <Route exact path="/adventures/:adventure_id"><Adventure/></Route>
            <Route exact path="/adventures"><AdventureList/></Route>
            <Route exact path="/"><Home/></Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;