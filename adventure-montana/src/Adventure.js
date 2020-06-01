/**
 * Component that renders one adventure with details
 * Admin users see buttons to delete and edit the adventure; users do not see these
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { deleteAdventure, getAdventureFromAPI } from './actions/adventuresActions';
import jwt from 'jsonwebtoken';
import Card from 'react-bootstrap/Card';

function Adventure () {
    const { adventure_id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const adventures = useSelector(store => store.adventures);
    const adventure = useSelector(store => store.adventures[adventure_id]);
    const token = useSelector(store => store.users.token);
    const decodedToken = jwt.decode(token);
    let admin = false;

    if (decodedToken && decodedToken.hasOwnProperty('is_admin')) {
        admin = true;
    }

    //useEffect necessary because if the store doesn't have this adventure loaded already (due to async), try to get it
    useEffect(() => {
        if(!adventure) {
            dispatch(getAdventureFromAPI(adventure_id));
        };
    }, [dispatch, adventure_id, adventure]);

    
    const deleteAdv = () => {
        dispatch(deleteAdventure(adventure_id,token));
        history.push('/adventures');
    }

    //if user enters hits a route for an invalid adventure, show message with button to go back
    if (!adventure && Object.keys(adventures).length === 0 && adventures.constructor === Object) {
        return (
            <>
            <h4>Can't find that adventure!</h4>
            <Button onClick={history.goBack}>Go Back</Button>
            </>
        )
    } else {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{adventure.name}</Card.Title>
                    <Card.Text>
                        <p>{adventure.description}</p>
                        <p>Minimum duration: {adventure.min_duration} minutes</p>
                        <i>{adventure.category}</i>
                    </Card.Text>
                    {admin ? <Link to={`/adventures/${adventure_id}/edit`}><Button variant="success">Edit</Button></Link> : null }
                    {admin ? <Button onClick={deleteAdv} variant="danger">Delete</Button> : null }
                    <Button onClick={history.goBack}>Back</Button>
                </Card.Body>
            </Card>                
        )
    }
}

export default Adventure;