import {
  FETCH_USER,
  IS_AUTH_USER,
  CLEAR_PROFILE,
  IS_FETCHING_USER,
} from "../../actions/user/types";

import { SWIPE } from "../../actions/swipe/types";

const initialState = {
  isFetchingUser: false,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        ...action.payload,
        isFetchingUser: false,
      };

    case IS_FETCHING_USER:
      return {
        ...state,
        isFetchingUser: action.payload,
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

    case SWIPE:
      return {
        ...state,
        is_liked: action.payload.liked,
        is_matched: action.payload.matched,
      };

    default:
      return state;
  }
}
