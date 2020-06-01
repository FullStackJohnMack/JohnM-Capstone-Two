/**
 *  Combines the adventures, users, and messages reducers
 */

import { combineReducers } from "redux";
import adventures from "./adventuresReducer";
import users from "./usersReducer";
import messages from "./messagesReducer";

export default combineReducers({
  adventures,
  users,
  messages
});