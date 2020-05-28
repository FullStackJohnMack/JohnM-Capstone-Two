import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editAdventure } from './actions/adventuresActions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { getCategoryId } from './helpers';

function EditAdventure () {

    const history = useHistory();
    const dispatch = useDispatch();
    const { adventure_id } = useParams();

    const adventure = useSelector(store => store.adventures[adventure_id]);
    const token = useSelector(store => store.users.token);

    const INITIAL_STATE = {
        advName: adventure.name,
        description: adventure.description,
        categoryId: getCategoryId(adventure.category),
        startingLoc: adventure.starting_location,
        endingLoc: adventure.ending_location,
        minDuration: adventure.min_duration,
        token: token
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editAdventure(adventure_id,formData));
        history.push(`/adventures/${adventure_id}`);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="addAdventureForm.advName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        type="text"
                        name="advName"
                        value={formData.advName}
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="addAdventureForm.description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="addAdventureForm.categoryId">
                    <Form.Label>Category:</Form.Label>
                    <Form.Control as="select" 
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}>
                            <option value="1">Hiking</option>
                            <option value="2">Wildlife</option>
                            <option value="3">Hunting</option>
                            <option value="4">Fishing</option>
                            <option value="5">Biking</option>
                            <option value="6">Off-Roading</option>
                            <option value="7">Winter</option>
                            <option value="8">Boating</option>
                            <option value="9">Watersports</option>
                        </Form.Control>
                </Form.Group>

                <Form.Group controlId="addAdventureForm.startingLoc">
                    <Form.Label>Starting Location:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="startingLoc"
                        value={formData.startingLoc}
                        placeholder="47.616862, -108.567182"
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="addAdventureForm.endingLoc">
                    <Form.Label>Ending Location:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="endingLoc"
                        value={formData.endingLoc}
                        placeholder="47.616862, -108.567182"
                        onChange={handleChange}/>
                </Form.Group>

                <Form.Group controlId="addAdventureForm.minDuration">
                    <Form.Label>Minimum Duration:</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="minDuration"
                        value={formData.minDuration}
                        placeholder="in minutes"
                        onChange={handleChange}/>
                </Form.Group>
              
                <Button type="submit" variant="success">Update</Button>  
                <Button onClick={history.goBack}>Cancel</Button>
            </Form>
        </Container>
    )
}

export default EditAdventure;