import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

function Adventure () {
    const { adventure_id } = useParams();

    const adventure = useSelector(store => store.adventures[adventure_id]);
    // console.log(adventure);

    return (
        <div>
            <h1>{adventure.name}</h1>
        </div>
    )
}

export default Adventure;