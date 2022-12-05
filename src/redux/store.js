import {  createStore } from "redux";
import {mainReducer } from "./reducer";
 const store=createStore(mainReducer);
 export default store;
 
// import { createStore } from "redux";
// import rootReducer from "./reducer";
 /* const rootReducer = combineReducers(
    {mainReducer,secondReducer}
); 
 */
//export const store=(rootReducer);


