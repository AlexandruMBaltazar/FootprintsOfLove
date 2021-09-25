import axios from "axios";

export const forgot = (email) => {
  return axios.post("/api/forgot", email);
};
export const login = (user) => {
  return axios.post("/api/login", user);
};
export const logout = () => {
  return axios.post("/api/logout");
};
export const reset = (data) => {
  return axios.post("/api/reset", data);
};

export const details = (detail) => {
  return axios.get(`/api/details?detail=${detail}`);
};
export const postDetails = (detail, userId) => {
  return axios.post(`api/users/${userId}/details`, detail);
};
export const putDetails = (detail, detailId) => {
  return axios.put(`api/details/${detailId}`, detail);
};
export const getDetails = (userId) => {
  return axios.get(`api/users/${userId}/details`);
};

export const getPhotos = (userId) => {
  return axios.get(`/api/users/${userId}/photos`);
};
export const postPhoto = (userId, photo) => {
  return axios.post(`/api/users/${userId}/photos`, photo);
};
export const putPhoto = (photoId, photo) => {
  return axios.put(`/api/photos/${photoId}`, photo);
};
export const deletePhoto = (photoId) => {
  return axios.delete(`/api/photos/${photoId}`);
};

export const getPreferences = (userId) => {
  return axios.get(`/api/users/${userId}/preferences`);
};
export const postPreferences = (userId, preferences) => {
  return axios.post(`/api/users/${userId}/preferences`, preferences);
};

export const getAuthUser = () => {
  return axios.get("/api/user");
};
export const signup = (user) => {
  return axios.post("/api/users", user);
};

export const getUsers = (page = 1) => {
  return axios.get(`/api/users?page=${page}`);
};
export const putUser = (user, userId) => {
  return axios.put(`/api/users/${userId}`, user);
};
