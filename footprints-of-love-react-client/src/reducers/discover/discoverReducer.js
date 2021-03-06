import {
  FETCH_PREFERED_USERS,
  IS_FETCHING_PREFERED_USERS,
  CLEAR_PREFERED_USERS,
} from "../../actions/discover/types";

const initialState = {
  preferedUsers: {
    users: [],
    next: null,
    prev: null,
    isLoading: false,
  },
};

export default function discoverReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PREFERED_USERS:
      return {
        ...state,
        preferedUsers: {
          users: state.preferedUsers.users
            ? [...state.preferedUsers.users, ...action.payload.data]
            : action.payload.data,
          next: action.payload.links.next,
          prev: action.payload.links.prev,
        },
      };

    case CLEAR_PREFERED_USERS:
      return {
        ...state,
        preferedUsers: {
          users: action.payload.data,
          next: null,
          prev: null,
          isLoading: false,
        },
      };

    case IS_FETCHING_PREFERED_USERS:
      return {
        ...state,
        preferedUsers: {
          ...state.preferedUsers,
          isLoading: action.payload,
        },
      };

    default:
      return state;
  }
}
