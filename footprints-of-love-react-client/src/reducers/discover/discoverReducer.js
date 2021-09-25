import { FETCH_PREFERED_USERS } from "../../actions/discover/types";

const initialState = {
  preferedUsers: {
    users: [],
    next: null,
    prev: null,
  },
};

export default function photoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PREFERED_USERS:
      return {
        ...state,
        preferedUsers: {
          users: action.payload.data,
          next: action.payload.links.next,
          prev: action.payload.links.prev,
        },
      };

    default:
      return state;
  }
}
