/**
 *  Actions using thunk middleware for messages
 */

import { ADDED_MESSAGE, REMOVED_MESSAGES } from "./actionTypes";

//Action creator for adding one message to the store
function addMessage(message) {
  return { type: ADDED_MESSAGE, payload: message };
}

//Action creator for removing one message to the store
function removeMessages() {
  return { type: REMOVED_MESSAGES };
}

export { addMessage, removeMessages }