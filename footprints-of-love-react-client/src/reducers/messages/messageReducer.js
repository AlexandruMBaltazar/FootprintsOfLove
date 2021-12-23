import {
  CHANGE_SESSION_STATUS,
  FETCH_MESSAGES,
  IS_FETCHING_MESSAGES,
} from "../../actions/messages/types";

const initialState = {
  isSessionOpen: false,
  sessionDetails: {
    session_id: null,
    user_id: null,
    profile_photo: null,
    first_name: null,
  },
  isFetchingMessages: false,
  messages: [],
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SESSION_STATUS:
      return {
        ...state,
        isSessionOpen:
          state.sessionDetails.session_id !== action.payload.session_id
            ? !state.isSessionOpen
            : true,
        sessionDetails: action.payload,
      };

    case IS_FETCHING_MESSAGES:
      return {
        ...state,
        isFetchingMessages: action.payload,
      };

    case FETCH_MESSAGES:
      return {
        ...state,
        messages: [...action.payload],
        isFetchingMessages: false,
      };

    default:
      return state;
  }
}
