import * as apiCalls from "../../api/apiCalls";

export const loginSuccess = () => (dispatch) => {
  apiCalls.getAuthUser().then((response) => {
    dispatch({
      type: "login-success",
      payload: response.data.data,
    });
  });
};

export const loginHandler = (credentials) => (dispatch) => {
  return apiCalls.login(credentials).then((response) => {
    dispatch(loginSuccess());
    return response;
  });
};
