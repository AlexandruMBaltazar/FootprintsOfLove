import {
  FETCH_LIKES,
  IS_FETCHING_LIKES,
  CLEAR_LIKES,
} from "../../actions/likes/types";

const initialState = {
  users: [],
  isFetchingLikes: false,
  next: null,
};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LIKES:
      return {
        ...state,
        users: [...state.users, ...action.payload.data],
        isFetchingLikes: false,
        next: action.payload.links.next,
      };

    case IS_FETCHING_LIKES:
      return {
        ...state,
        isFetchingLikes: action.payload,
      };

    case CLEAR_LIKES:
      return initialState;

    default:
      return state;
  }
}
