import {
  FETCH_USER,
  IS_AUTH_USER,
  CLEAR_PROFILE,
} from "../../actions/user/types";

const initialState = {};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        ...action.payload,
      };

    case IS_AUTH_USER:
      return {
        ...state,
        isAuthUser: action.payload,
      };

    case CLEAR_PROFILE:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}
