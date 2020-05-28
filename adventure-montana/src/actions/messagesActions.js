/**
 *  Thunk action that retrieves a planet from the API and call an async dispatch with that planet object
 */

import { ADDED_MESSAGE, REMOVED_MESSAGES } from "./actionTypes";

function addMessage(message) {
  return { type: ADDED_MESSAGE, payload: message };
}

function removeMessages() {
  return { type: REMOVED_MESSAGES };
}


export { addMessage, removeMessages }