import React, { useEffect }  from 'react';
import GoogleMaps from 'simple-react-google-maps';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdventuresFromAPI } from './actions/adventuresActions';
import axios from 'axios';

function AdventureMap () {

    async function getAPIKey() {
        const res = await axios.get('https://adventure-montana.netlify.app/.netlify/functions/api');
        return res.data;
    }
    // async function getAPIKey() {
    //     const res = await axios.get('https://adventure-montana.netlify.app/.netlify/functions/api');
    //     return res.data;
    // }

    const { GOOGLE_MAPS_API_KEY } = process.env;



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAdventuresFromAPI())
    }, [dispatch]);

    const adventuresObj = useSelector(store => (store.adventures));
    const markers = [];

     
    if (adventuresObj) {
        Object.values(adventuresObj).forEach(adv => {
            let coords = adv.starting_location.split(',')
            markers.push({lat:parseFloat(coords[0]),lng:parseFloat(coords[1]),label:adv.name,id:parseInt(adv.adventure_id),min_dur:adv.min_duration,cat:adv.category});
        })
    }

    return (

            <GoogleMaps
                apiKey={AIzaSyA2Tzr8rXJlzcIh5b76LMwJ4AHH97T_BUE}
                style={{height: "80vh", width: "90vw"}}
                zoom={7}
                center={{lat: 47.5081513, lng: -111.3247377}}
                markers={markers} //optional
            />
    );
    }
    
    export default AdventureMap;