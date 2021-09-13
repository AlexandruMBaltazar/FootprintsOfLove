import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userDetailsReducer from "./user/details/userDetailsReducer";
import photoReducer from "./photo/photoReducer";
import userPreferenceReducer from "./user/preference/userPreferenceReducer";

export default combineReducers({
  auth: authReducer,
  userDetails: userDetailsReducer,
  photo: photoReducer,
  userPreference: userPreferenceReducer,
});
