/**
 *   Adventures reducer
 */

import { LOADED_ADVENTURE, LOADED_ALL_ADVENTURES, ADDED_ADVENTURE, DELETED_ADVENTURE, EDITED_ADVENTURE } from "../actions/actionTypes";
import { objFilter } from '../helpers';

const INITIAL_STATE = {};

function adventures(state = INITIAL_STATE, action) {
  switch (action.type) {

    case LOADED_ADVENTURE:
      return {
        [action.payload.adventure_id]: { ...action.payload }
      };

    case LOADED_ALL_ADVENTURES:
      let obj = {};
      action.payload.adventures.forEach(element => {
        obj[element.adventure_id] = element;
      });
      return obj;

    case ADDED_ADVENTURE:
      return {
        ...state,
        [action.payload.adventure_id]: { ...action.payload }
      }
    
    case EDITED_ADVENTURE:
      return {
        ...state,
        [action.payload.adventure_id]: { ...action.payload }
      }

    case DELETED_ADVENTURE:
      return (objFilter(state, adventure => {
        return adventure.adventure_id !== parseInt(action.payload);
      }))

    default:
      return state;
  }
}

export default adventures;