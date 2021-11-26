import * as apiCalls from "../../api/apiCalls";
import { FETCH_SESSIONS } from "./types";

export const fetchSessions = () => (dispatch) => {
  return apiCalls.getSessions().then((response) => {
    dispatch({
      type: FETCH_SESSIONS,
      payload: response.data.data,
    });
  });
};
