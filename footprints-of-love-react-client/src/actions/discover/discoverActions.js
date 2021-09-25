import * as apiCalls from "../../api/apiCalls";
import { FETCH_PREFERED_USERS } from "./types";

export const fetchPreferedUsers = (page) => (dispatch) => {
  return apiCalls.getUsers(page).then((response) => {
    dispatch({
      type: FETCH_PREFERED_USERS,
      payload: response.data,
    });
  });
};
