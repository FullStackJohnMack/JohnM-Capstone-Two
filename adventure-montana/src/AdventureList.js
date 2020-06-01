/**
 * Component that displays a list of all adventures
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAdventuresFromAPI } from './actions/adventuresActions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function AdventureList () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAdventuresFromAPI())
    }, [dispatch]);

    const adventuresObj = useSelector(store => (store.adventures));
    
    const adventureList = [];
    
    if (adventuresObj) {
        Object.values(adventuresObj).forEach(adv => {

            adventureList.push(
                <Card key={adv.adventure_id}>
                    <Card.Body>
                        <Card.Title>{adv.name}</Card.Title>
                        <Card.Text>{adv.description}</Card.Text>
                        <Link to={`adventures/${(adv.adventure_id)}`}><Button>View</Button></Link>
                    </Card.Body>
                </Card>);
        })
    }    

    return (
        <Container>
            {adventureList}
        </Container>
    )
}

export default AdventureList;