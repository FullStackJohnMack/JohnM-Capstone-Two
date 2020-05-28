/**
 *  Combines the films, planets, and people reducers
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