/**
 *  Planet reducer is later combined with the films and people reducers
 */

import { LOADED_ADVENTURE, LOADED_ALL_ADVENTURES, ADDED_ADVENTURE } from "../actions/actionTypes";

const INITIAL_STATE = {};


function adventures(state = INITIAL_STATE, action) {
  switch (action.type) {

    case LOADED_ADVENTURE:
      return {
        ...state,
        [action.payload.adventure_id]: { ...action.payload }
      };

    case LOADED_ALL_ADVENTURES:
      let obj = {};
      action.payload.adventures.forEach(element => {
        obj[element.adventure_id] = element;
      });
      return obj;

    case ADDED_ADVENTURE:
      console.log(action.payload);
      return {
        ...state,
        [action.payload.adventure_id]: { ...action.payload }
      }

    default:
      return state;
  }
}

export default adventures;