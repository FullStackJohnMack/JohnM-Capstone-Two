import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdventuresFromAPI } from './actions/adventuresActions';

const BASE_URL = 'https://res.cloudinary.com/back-road-code/image/upload';

function AdventureMap () {

    const containerStyle = {
        width: '100vw',
        height: '100vh'
      };
      
      const center = {
        lat: 47.5081513,
        lng: -111.3247377
      };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAdventuresFromAPI())
    }, [dispatch]);

    const adventuresObj = useSelector(store => (store.adventures));
    const markers = [];

    const [ selected, setSelected ] = useState({});
  
    const onSelect = (item) => {
        setSelected(item);
        console.log(item);
    }

    const convertCoords = (string) => {
        let coords = string.split(',');
        return {
            lat:parseFloat(coords[0]),
            lng:parseFloat(coords[1])
        }
    }
     
    if (adventuresObj) {
        Object.values(adventuresObj).forEach(adv => {

            let image;

            switch (adv.category) {
                case "Hiking":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/hiking_jvtm0j.png`;
                  break;
                case "Wildlife":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/wildlife_w2l8vn.png`;
                  break;
                case "Hunting":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/hunting_mkjgzm.png`;
                  break;
                case "Biking":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/biking_cy9brs.png`;
                  break;
                case "Off-Roading":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/off-roading_h8duqq.png`;
                  break;
                case "Boating":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/boating_samm5m.png`;
                  break;
                case "Watersports":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/watersports_oqvkxe.png`;
                  break;
                case "Winter":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/winter_xqzimp.png`;
                  break;
                case "Fishing":
                  image = `${BASE_URL}/c_scale,co_rgb:ff0000,e_colorize:100,w_20/v1590704140/fishing_ztbaof.png`;
                  break;
                default:
                    image = null;
              }

            markers.push(
                <Marker 
                    position={convertCoords(adv.starting_location)}
                    id={parseInt(adv.adventure_id)}
                    min_dur={adv.min_duration}
                    cat={adv.category}
                    key={adv.adventure_id}
                    icon={image}
                    onClick={() => onSelect(adv)}

                />
            )
        })
    }  

    return (
        <LoadScript googleMapsApiKey="AIzaSyA2Tzr8rXJlzcIh5b76LMwJ4AHH97T_BUE">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
            >
                {markers}
                {selected.starting_location && 
                    (
                    <InfoWindow
                        position={convertCoords(selected.starting_location)}
                        clickable={true}
                        onCloseClick={() => setSelected({})}
                    >
                        <div>
                            <p><a href={`/adventures/${selected.adventure_id}`}>{selected.name}</a></p>
                            <p>{`Duration: ${selected.min_duration} minutes`}</p>
                            <i>{selected.category}</i>
                        </div>
                    </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    );
    }
    
    export default AdventureMap;