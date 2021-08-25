import * as apiCalls from "../../api/apiCalls";
import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const loginSuccess = () => (dispatch) => {
  return apiCalls.getAuthUser().then((response) => {
    const user = { ...response.data.data };

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });

    return response;
  });
};

export const logout = () => (dispatch) => {
  return apiCalls.logout().then((response) => {
    dispatch({
      type: LOGOUT,
    });

    return response;
  });
};

export const loginHandler = (credentials) => (dispatch) => {
  return apiCalls.login(credentials).then((response) => {
    return dispatch(loginSuccess());
  });
};
