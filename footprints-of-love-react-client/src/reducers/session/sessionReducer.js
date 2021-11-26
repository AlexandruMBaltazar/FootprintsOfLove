import { FETCH_SESSIONS } from "../../actions/sessions/types";

const initialState = {
  sessions: [],
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
      };

    default:
      return state;
  }
}
