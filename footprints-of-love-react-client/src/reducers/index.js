import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userDetailsReducer from "./user/details/userDetailsReducer";

export default combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
});
