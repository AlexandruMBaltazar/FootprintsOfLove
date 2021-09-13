import * as apiCalls from "../../../api/apiCalls";
import {
  FETCH_USER_PREFERENCES,
  LOADING_USER_PREFERENCES,
  POST_USER_PREFERENCES,
  POSTING_USER_PREFERENCES,
} from "./types";

export const fetchUserPreferences = (userId) => (dispatch) => {
  dispatch({
    type: LOADING_USER_PREFERENCES,
    payload: true,
  });
  return apiCalls.getPreferences(userId).then((response) => {
    dispatch({
      type: FETCH_USER_PREFERENCES,
      payload: response.data.data,
    });
  });
};

export const postUserPreferences = (userId, preferences) => (dispatch) => {
  dispatch({
    type: POSTING_USER_PREFERENCES,
    payload: true,
  });
  return apiCalls.postPreferences(userId, preferences).then((response) => {
    dispatch({
      type: POST_USER_PREFERENCES,
      payload: response.data.data,
    });
  });
};
