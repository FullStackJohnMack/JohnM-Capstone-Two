import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { deleteAdventure, getAdventureFromAPI } from './actions/adventuresActions';
import jwt from 'jsonwebtoken';

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


    useEffect(() => {
        if(!adventure) {
            dispatch(getAdventureFromAPI(adventure_id));
        };
    }, [dispatch, adventure_id, adventure]);

    

    const deleteAdv = () => {
        dispatch(deleteAdventure(adventure_id,token));
        history.push('/adventures');
    }

    if (!adventure && Object.keys(adventures).length === 0 && adventures.constructor === Object) {
        return (
            <>
            <h4>Can't find that adventure!</h4>
            <Button onClick={history.goBack}>Go Back</Button>
            </>
        )
    } else {
        return (
            <div>
                <h1>{adventure.name}</h1>
                <p>{adventure.description}</p>
                <p>Minimum duration: {adventure.min_duration} minutes</p>
                
                {admin ? <Link to={`/adventures/${adventure_id}/edit`}><Button variant="success">Edit</Button></Link> : null }
                {admin ? <Button onClick={deleteAdv} variant="danger">Delete</Button> : null }
                <Button onClick={history.goBack}>Back</Button>
            </div>
        )
    }
}

export default Adventure;