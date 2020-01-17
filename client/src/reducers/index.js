import { combineReducers } from "redux";
import stockReducer from "./stockReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

// root reducer in store.js
export default combineReducers({
  stock: stockReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
});
