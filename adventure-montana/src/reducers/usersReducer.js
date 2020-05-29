/**
 *   reducer is later combined with the  and  reducers
 */

import { LOGGED_IN, LOGGED_OUT, REGISTERED_USER } from "../actions/actionTypes";

const INITIAL_STATE = {};


function users(state = INITIAL_STATE, action) {
  switch (action.type) {

    case LOGGED_IN:
      return action.payload;

    case LOGGED_OUT:
      return INITIAL_STATE;

    case REGISTERED_USER:
      return action.payload;
   
    default:
      return state;
  }
}

export default users;