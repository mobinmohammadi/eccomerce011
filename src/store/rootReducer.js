import { combineReducers } from "@reduxjs/toolkit";
import HomeReducer from "./Reducers/homeReducers";
import authReducer from "./Reducers/authReducer";
import cartReducer from "./Reducers/cartReducer";

const rootReducer = combineReducers({
  home: HomeReducer,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer; // ← default export
