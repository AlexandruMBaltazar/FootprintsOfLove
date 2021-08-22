import axios from "axios";

export const signup = (user) => {
  return axios.post("/api/register", user);
};

export const login = (user) => {
  return axios.post("/api/login", user);
};
