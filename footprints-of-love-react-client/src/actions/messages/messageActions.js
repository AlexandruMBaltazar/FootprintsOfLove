import {
  CHANGE_SESSION_STATUS,
  FETCH_MESSAGES,
  IS_FETCHING_MESSAGES,
} from "./types";
import * as apiCalls from "../../api/apiCalls";

export const changeSessionStatus =
  (
    sessionDetails = {
      session_id: null,
      user_id: null,
      profile_photo: null,
      first_name: null,
    }
  ) =>
  (dispatch) => {
    dispatch({
      type: CHANGE_SESSION_STATUS,
      payload: sessionDetails,
    });
  };

export const fetchMessages = (sessionId) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_MESSAGES,
    payload: true,
  });
  return apiCalls.getSessionMessages(sessionId).then((response) => {
    dispatch({
      type: FETCH_MESSAGES,
      payload: response.data.data,
    });
  });
};
