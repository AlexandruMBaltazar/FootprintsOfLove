import * as apiCalls from "../../api/apiCalls";
import { FETCH_SESSIONS } from "./types";

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
