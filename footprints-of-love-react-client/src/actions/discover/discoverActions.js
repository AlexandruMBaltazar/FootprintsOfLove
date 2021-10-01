import * as apiCalls from "../../api/apiCalls";
import {
  FETCH_PREFERED_USERS,
  IS_FETCHING_PREFERED_USERS,
  CLEAR_PREFERED_USERS,
} from "./types";

export const fetchPreferedUsers = (page) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_PREFERED_USERS,
    payload: true,
  });
  return apiCalls.getUsers(page).then((response) => {
    dispatch({
      type: FETCH_PREFERED_USERS,
      payload: response.data,
    });
  });
};

export const clearPreferedUsers = () => (dispatch) => {
  dispatch({
    type: CLEAR_PREFERED_USERS,
    payload: [],
  });
};
