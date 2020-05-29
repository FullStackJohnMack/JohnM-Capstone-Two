/**
 *   reducer is later combined with the  and  reducers
 */

import { ADDED_MESSAGE, REMOVED_MESSAGES } from "../actions/actionTypes";

const INITIAL_STATE = [];

function messages(state = INITIAL_STATE, action) {
  
  switch (action.type) {

    case ADDED_MESSAGE:
      return [...state,action.payload];

    case REMOVED_MESSAGES:
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default messages;