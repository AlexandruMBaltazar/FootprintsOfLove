import { LOGIN_SUCCESS, LOGOUT, UPDATE } from "../../actions/auth/types";
import { SET_PROFILE_PHOTO } from "../../actions/photo/types";

const initialState = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  profile_photo: {},
  isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROFILE_PHOTO:
      return {
        ...state,
        profile_photo: action.payload,
      };

    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };

    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
