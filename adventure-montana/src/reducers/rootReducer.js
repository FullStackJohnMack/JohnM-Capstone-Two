/**
 *  Combines the films, planets, and people reducers
 */

import { combineReducers } from "redux";
import adventures from "./adventuresReducer";

export default combineReducers({
  adventures
});