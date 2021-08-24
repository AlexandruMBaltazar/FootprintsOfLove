import axios from "axios";

export const forgot = (email) => {
  return axios.post("/api/forgot", email);
};

export const getAuthUser = () => {
  return axios.get("/api/user");
};

export const login = (user) => {
  return axios.post("/api/login", user);
};

export const logout = () => {
  return axios.post("/api/logout");
};

export const signup = (user) => {
  return axios.post("/api/register", user);
};

export const reset = (data) => {
  return axios.post("/api/reset", data);
};
