import axios from "axios";

export const login = (user) => {
  return axios.post("/api/login", user);
};

export const logout = () => {
  return axios.post("/api/logout");
};

export const signup = (user) => {
  return axios.post("/api/register", user);
};

export const getAuthUser = () => {
  return axios.get("/api/user");
};
