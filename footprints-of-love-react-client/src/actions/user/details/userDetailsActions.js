import * as apiCalls from "../../../api/apiCalls";
import {
  FETCH_USER_DETAILS,
  LOADING_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from "./types";

export const fetchUserDetails = (userId) => (dispatch) => {
  dispatch({
    type: LOADING_USER_DETAILS,
    payload: true,
  });
  return apiCalls.getDetails(userId).then((response) => {
    dispatch({
      type: FETCH_USER_DETAILS,
      payload: response.data.data,
    });
  });
};

export const updateUserDetails = (detail, detailId) => (dispatch) => {
  dispatch({
    type: LOADING_USER_DETAILS,
    payload: true,
  });
  return apiCalls.putDetails(detail, detailId).then((response) => {
    dispatch({
      type: UPDATE_USER_DETAILS,
      payload: response.data.data,
    });
  });
};
