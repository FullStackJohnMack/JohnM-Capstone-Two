import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllAdventuresFromAPI } from './actions/adventuresActions';

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
                <div key={adv.adventure_id}>
                    <Link to={`adventures/${(adv.adventure_id)}`}>
                        <h3>{adv.name}</h3>
                    </Link>
                    <p>{adv.description}</p>
                </div>);
        })
    }
    

    return (
        <div>
            {adventureList}
        </div>
    )
}

export default AdventureList;