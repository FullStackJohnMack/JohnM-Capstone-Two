/**
 *  Thunk action that retrieves a planet from the API and call an async dispatch with that planet object
 */

import axios from "axios";
import { LOADED_ADVENTURE, LOADED_ALL_ADVENTURES, ADDED_ADVENTURE, DELETED_ADVENTURE, EDITED_ADVENTURE } from "./actionTypes";
import { addMessage } from "./messagesActions";
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
    } = res.data.adventure;

    const adventure = { adventure_id, name, description, category, starting_location, min_duration };
    dispatch(gotAdventure(adventure));
  };
}


function gotAdventure(adventure) {
  return { type: LOADED_ADVENTURE, payload: adventure };
}

function getAllAdventuresFromAPI() {
  return async function (dispatch) {
    let res = await axios.get(`${API_URL}/adventures/`);

    dispatch(gotAllAdventures(res.data));
  };
}

function gotAllAdventures(adventuresArray) {
  return { type: LOADED_ALL_ADVENTURES, payload: adventuresArray };
}

function addAdventure(adventure) {

  return async function (dispatch) {
    try {
      let res = await axios.post(`${API_URL}/adventures/`, {
        name: adventure.advName,
        description: adventure.description,
        category_id: parseInt(adventure.categoryId),
        starting_location: adventure.startingLoc,
        ending_location: adventure.endingLoc,
        min_duration: parseInt(adventure.minDuration),
        token: adventure.token
      });
      dispatch(addedAdventure(res.data));
    } catch (e) {
    dispatch(addMessage("Can't create adventure"));
    }
  }
}

function addedAdventure(newlyCreatedAdventure) {
  return { type: ADDED_ADVENTURE, payload: newlyCreatedAdventure };
}

function deleteAdventure(adventure_id,token) {

  return async function (dispatch) {

    await axios({
      method: 'delete',
      url: `${API_URL}/adventures/${adventure_id}`,
      data: {
        token: token
        }
    });
    dispatch(deletedAdventure(adventure_id));
  }
}

function deletedAdventure(adventure_id) {
  return { type: DELETED_ADVENTURE, payload: adventure_id };
}


function editAdventure(adventure_id,adventure) {

  // console.log(adventure);
  return async function (dispatch) {

    let res = await axios({
      method: 'patch',
      url: `${API_URL}/adventures/${adventure_id}`,
      data: {
        name: adventure.advName,
        description: adventure.description,
        category_id: parseInt(adventure.categoryId),
        starting_location: adventure.startingLoc,
        ending_location: adventure.endingLoc,
        min_duration: parseInt(adventure.minDuration),
        token: adventure.token
      }
    });
    dispatch(editedAdventure(res.data));
  }
}

function editedAdventure(adventure) {
  return { type: EDITED_ADVENTURE, payload: adventure};
}


export { getAdventureFromAPI, getAllAdventuresFromAPI, addAdventure, deleteAdventure, editAdventure }