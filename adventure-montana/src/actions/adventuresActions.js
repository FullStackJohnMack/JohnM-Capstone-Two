/**
 *  Actions using thunk middleware for adventures
 */

import axios from "axios";
import { LOADED_ADVENTURE, LOADED_ALL_ADVENTURES, ADDED_ADVENTURE, DELETED_ADVENTURE, EDITED_ADVENTURE } from "./actionTypes";
import { addMessage } from "./messagesActions"; //used to flash messages to the user
const { API_URL } = require("../config");


/**
 * Gets one adventure from the backend 
 * Accepts an adventure_id, gets the adventure from the backend, and dispatches it to the store
 */

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

//Action creator for adding one adventure to the store
function gotAdventure(adventure) {
  return { type: LOADED_ADVENTURE, payload: adventure };
}


/**
 * Gets all adventures from the backend 
 * Gets all adventures from the backend and dispatches them to the store
 */

function getAllAdventuresFromAPI() {
  return async function (dispatch) {
    let res = await axios.get(`${API_URL}/adventures/`);

    dispatch(gotAllAdventures(res.data));
  };
}

//Action creator for adding all adventures to the store
function gotAllAdventures(adventuresArray) {
  return { type: LOADED_ALL_ADVENTURES, payload: adventuresArray };
}


/**
 * Adds one adventure to the backend database
 * Accepts an adventure object, performs a POST request with that object, and dispatches it to the store.
 * If the adventure can't be created, a flashed message is thrown.
 */

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
      return(res.data);
    } catch (e) {
    dispatch(addMessage("Can't create adventure"));
    }
  }
}

//Action creator for adding newly created adventure to store
function addedAdventure(newlyCreatedAdventure) {
  return { type: ADDED_ADVENTURE, payload: newlyCreatedAdventure };
}


/**
 * Deletes one adventure from the backend 
 * Accepts an adventure_id and a token, deletes the adventure from the backend, and dispatches that deletion to the store
 */
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

//Action creator to remove the recently deleted adventure from the store
function deletedAdventure(adventure_id) {
  return { type: DELETED_ADVENTURE, payload: adventure_id };
}


/**
 * Patches an adventure stored on the backend 
 * Accepts an adventure_id and adventure, patches the adventure on the backend, and dispatches the edited adventure to the store
 */
function editAdventure(adventure_id,adventure) {

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

//Action creator that changes an adventure in the store
function editedAdventure(adventure) {
  return { type: EDITED_ADVENTURE, payload: adventure};
}


export { getAdventureFromAPI, getAllAdventuresFromAPI, addAdventure, deleteAdventure, editAdventure }