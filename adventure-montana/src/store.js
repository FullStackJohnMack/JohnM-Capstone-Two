/**
 *  Used with the PersistGate component to sync the Redux store with localStorage. 
 */

import { composeWithDevTools} from "redux-devtools-extension";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";

//key specifies that everything in the root reducer persists in the persistent state
//the stateReconciler setting indicates that two levels of shallow copying are used when merging data
const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2
};

//listed in the createStore function below
const persistedReducer = persistReducer(persistConfig, rootReducer);

//persistedReducer recieves the same information as the Redux store
export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  )
);

export const persistedStore = persistStore(store);