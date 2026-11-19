import { combineReducers } from "@reduxjs/toolkit";
import HomeReducer from "./Reducers/homeReducers";
import authReducer from "./Reducers/authReducer";
import cartReducer from "./Reducers/cartReducer";
import ordersReducer from "./Reducers/orderReducer";
import dashboardReducer from "./Reducers/dashboardReducer";

const rootReducer = combineReducers({
  home: HomeReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
  dashboard: dashboardReducer,  
});

export default rootReducer; 
