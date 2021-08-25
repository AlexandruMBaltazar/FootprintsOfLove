import axios from "axios";

export const details = (detail) => {
  return axios.get(`/api/details?detail=${detail}`);
};

export const postDetails = (detail, userId) => {
  return axios.post(`api/users/${userId}/details`, detail);
};

export const putUser = (user, userId) => {
  return axios.put(`/api/users/${userId}`, user);
};

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
