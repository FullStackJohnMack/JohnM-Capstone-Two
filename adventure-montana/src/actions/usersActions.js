/**
 *  Actions using thunk middleware for users
 */

import axios from "axios";
import { LOGGED_IN, LOGGED_OUT, REGISTERED_USER } from "./actionTypes";
import { addMessage } from "./messagesActions";
const { API_URL } = require("../config");


/**
 * Logs in a user to the backend 
 * Accepts a username and password, receives a token, and dispatches the logged-in user to the store
 * If unable to login, flashes a message to the UI
 */

function login(data) {
  
  return async function (dispatch) {
    try {
      let res = await axios.post(`${API_URL}/login/`, {
      username: data.username,
      password: data.password
    });

    let user = {
      username: data.username,
      token: res.data.token
    }
    dispatch(loggedIn(user));
    

    } catch (e) {
    dispatch(addMessage("Invalid username/password"));
    }
  }
}

//Action creator for adding a logged in user to the store
function loggedIn(user) {
  return { type: LOGGED_IN, payload: user };
}

//Action creator for removing the user from the store
function loggedOut() {
  return { type: LOGGED_OUT};
}


/**
 * Registers a user using backend 
 * Accepts user data, receives a token, and dispatches the newly created and logged-in user to the store
 * If unable to login, flashes a message to the UI
 */

function registerUser(data) {

    return async function (dispatch) {
      try {

        let res = await axios.post(`${API_URL}/users`, {
          username: data.username,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        });

        let user = {
          username: res.data.username,
          token: res.data.token
        }

        dispatch(registeredUser(user));
      } catch (e) {
      dispatch(addMessage("Can't register user"));
      }
    }
}

//action creator for adding a newly created user to the store
function registeredUser(user) {
  return { type: REGISTERED_USER, payload: user };
}

export { login, loggedOut, registerUser }