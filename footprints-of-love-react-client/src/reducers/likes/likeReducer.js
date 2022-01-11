import {
  FETCH_USERS_THAT_LIKES_YOU,
  IS_FETCHING_LIKES,
} from "../../actions/likes/types";

const initialState = {
  users: [],
  isFetchingLikes: false,
};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_THAT_LIKES_YOU:
      return {
        ...state,
        users: action.payload,
        isFetchingLikes: false,
      };

    case IS_FETCHING_LIKES:
      return {
        ...state,
        isFetchingLikes: action.payload,
      };

    default:
      return state;
  }
}
