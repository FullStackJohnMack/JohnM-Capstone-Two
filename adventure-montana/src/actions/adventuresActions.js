/**
 *  Thunk action that retrieves a planet from the API and call an async dispatch with that planet object
 */

import axios from "axios";
import { LOADED_ADVENTURE, LOADED_ALL_ADVENTURES, ADDED_ADVENTURE } from "./actionTypes";
const API_URL = 'http://localhost:3001';

function getAdventureFromAPI(adventure_id) {
  return async function (dispatch) {
    let res = await axios.get(`${API_URL}/adventures/${adventure_id}/`);
    let {
      name,
      description,
      category,
      starting_location,
      min_duration
    } = res.data;

    // //the match method here uses a regular expression to return a string of the ID number from the URL of each character or film which is used as the key for that object
    // residents = residents.map(url => url.match(/\d+/)[0]);
    // films = films.map(url => url.match(/\d+/)[0]);

    const adventure = { name, description, category, starting_location, min_duration };
    dispatch(gotAdventure(adventure));
  };
}


function gotAdventure(adventure) {
  return { type: LOADED_ADVENTURE, payload: adventure };
}

function getAllAdventuresFromAPI() {
  return async function (dispatch) {
    let res = await axios.get(`${API_URL}/adventures/`);
    // let {
    //   adventure_id,
    //   name,
    //   description,
    //   category,
    //   starting_location,
    //   ending_location,
    //   min_duration,
    //   max_duration,
    //   avg_duration,
    //   created_at,
    //   modified_at
    // } = res.data;

    //the match method here uses a regular expression to return a string of the ID number from the URL of each character or film which is used as the key for that object
    // residents = residents.map(url => url.match(/\d+/)[0]);
    // films = films.map(url => url.match(/\d+/)[0]);

    // const adventures = { name, description, category};
    // console.log(res.data);
    dispatch(gotAllAdventures(res.data));
  };
}

function gotAllAdventures(adventuresArray) {
  return { type: LOADED_ALL_ADVENTURES, payload: adventuresArray };
}

function addAdventure(adventure) {
  // console.log(adventure);
  return async function (dispatch) {

    let res = await axios.post(`${API_URL}/adventures/`, {
      name: adventure.advName,
      description: adventure.description,
      category_id: parseInt(adventure.categoryId),
      starting_location: adventure.startingLoc,
      ending_location: adventure.endingLoc,
      min_duration: parseInt(adventure.minDuration),
      // max_duration: parseInt(adventure.maxDuration) || -1
    });
    dispatch(addedAdventure(res.data));
  }
}

function addedAdventure(newlyCreatedAdventure) {
  return { type: ADDED_ADVENTURE, payload: newlyCreatedAdventure };
}

//left off needing to add this to adventureReducer


export { getAdventureFromAPI, getAllAdventuresFromAPI, addAdventure }