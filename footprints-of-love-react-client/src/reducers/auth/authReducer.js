import { LOGIN_SUCCESS, LOGOUT, UPDATE } from "../../actions/auth/types";

const initialState = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  isLoggedIn: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
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
