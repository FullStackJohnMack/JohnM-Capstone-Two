/**
 *  Thunk action that retrieves a  from the API and call an async dispatch with that  object
 */

import axios from "axios";
import { LOGGED_IN, LOGGED_OUT, REGISTERED_USER } from "./actionTypes";
import { addMessage } from "./messagesActions";
const { API_URL } = require("../config");

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

function loggedIn(user) {
  return { type: LOGGED_IN, payload: user };
}

function loggedOut() {
  return { type: LOGGED_OUT};
}

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

  function registeredUser(user) {
    return { type: REGISTERED_USER, payload: user };
  }

export { login, loggedOut, registerUser }