import * as apiCalls from "../../api/apiCalls";
import {
  FETCH_USER,
  IS_AUTH_USER,
  CLEAR_PROFILE,
  IS_FETCHING_USER,
} from "./types";

export const getUser = (userId) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_USER,
    payload: true,
  });
  return apiCalls.getUser(userId).then((response) => {
    dispatch({
      type: FETCH_USER,
      payload: response.data.data,
    });
  });
};

export const setIsAuthUser = (value) => (dispatch) => {
  dispatch({
    type: IS_AUTH_USER,
    payload: value,
  });
};

export const clearProfile = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
    payload: {},
  });
};
