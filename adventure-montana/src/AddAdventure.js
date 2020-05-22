import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAdventure } from './actions/adventuresActions';

function AddAdventure () {

    const history = useHistory();
    const dispatch = useDispatch();
    // const { adventure_id } = useParams();

    // const adventure = useSelector(store => store.adventures[adventure_id]);

    const INITIAL_STATE = {
        advName:'',
        description:'',
        categoryId:'',
        startingLoc:'',
        endingLoc:'',
        minDuration:'',
        // maxDuration:''
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
        e.preventDefault();
        setFormData(INITIAL_STATE);
        dispatch(addAdventure(formData));
        history.push('/adventures');
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="advName">Name:</label>
                <input 
                    type="text" 
                    name="advName"
                    value={formData.advName}
                    onChange={handleChange}>
                </input>
                <label htmlFor="description">Description:</label>
                <input 
                    type="text" 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}>
                </input>
                <label htmlFor="categoryId">Category ID:</label>
                <input 
                    type="text" 
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}>
                </input>
                <label htmlFor="startingLoc">Starting Location:</label>
                <input 
                    type="text" 
                    name="startingLoc"
                    value={formData.startingLoc}
                    onChange={handleChange}>
                </input>
                <label htmlFor="endingLoc">Ending Location:</label>
                <input 
                    type="text" 
                    name="endingLoc"
                    value={formData.endingLoc}
                    onChange={handleChange}>
                </input>
                <label htmlFor="minDuration">Minimum Duration:</label>
                <input 
                    type="text" 
                    name="minDuration"
                    value={formData.minDuration}
                    onChange={handleChange}>
                </input>
                {/* <label htmlFor="maxDuration">Maximum Duration:</label>
                <input 
                    type="text" 
                    name="maxDuration"
                    value={formData.maxDuration}
                    onChange={handleChange}>
                </input> */}
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default AddAdventure;