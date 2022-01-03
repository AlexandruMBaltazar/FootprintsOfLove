import { FETCH_SESSIONS, CLEAR_SESSIONS } from "../../actions/sessions/types";

const initialState = {
  sessions: [],
  next: null,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SESSIONS:
      return {
        ...state,
        sessions:
          state.sessions.length > 0
            ? [...state.sessions, ...action.payload.data]
            : action.payload.data,
        next: action.payload.links.next,
      };

    case CLEAR_SESSIONS:
      return initialState;

    default:
      return state;
  }
}
