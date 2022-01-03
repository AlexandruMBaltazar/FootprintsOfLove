import * as apiCalls from "../../api/apiCalls";
import { FETCH_SESSIONS, CLEAR_SESSIONS } from "./types";

export const fetchSessions =
  (page = 1) =>
  (dispatch) => {
    return apiCalls.getSessions(page).then((response) => {
      dispatch({
        type: FETCH_SESSIONS,
        payload: response.data,
      });
    });
  };

export const clearSessions = () => (dispatch) => {
  dispatch({
    type: CLEAR_SESSIONS,
    payload: [],
  });
};
