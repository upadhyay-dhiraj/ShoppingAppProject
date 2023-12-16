import {  legacy_createStore,combineReducers} from "redux";
import favouritereducer from "../redux/favouritereducer.js";
import cartreducer from "../redux/cartreducer.js";


const rootReducer = combineReducers({favouriteReducer:favouritereducer,cartReducer:cartreducer});

export const configureStore = legacy_createStore(rootReducer);