import * as apiCalls from "../../api/apiCalls";
import { LOGIN_SUCCESS, LOGOUT } from "./types";

export const loginSuccess = () => (dispatch) => {
  return apiCalls.getAuthUser().then((response) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.data,
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
    dispatch(loginSuccess());
    return response;
  });
};
