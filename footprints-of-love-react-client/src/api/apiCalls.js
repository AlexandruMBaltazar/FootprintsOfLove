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

export const getBlockedAccounts = (page) => {
  return axios.get(`/api/blocked-accounts?page=${page}`);
};
export const postBlockedAccounts = (user_id) => {
  return axios.post(`/api/blocked-accounts`, user_id);
};
export const deleteBlockedAccounts = (account_id) => {
  return axios.delete(`/api/blocked-accounts/${account_id}`);
};

export const postCloseCall = (userId) => {
  return axios.post(`/api/call/closeCall`, userId);
};

export const details = (detail) => {
  return axios.get(`/api/details?detail=${detail}`);
};
export const postDetails = (detail, userId) => {
  return axios.post(`/api/users/${userId}/details`, detail);
};
export const putDetails = (detail, detailId) => {
  return axios.put(`/api/details/${detailId}`, detail);
};
export const getDetails = (userId) => {
  return axios.get(`/api/users/${userId}/details`);
};

export const searchLocation = (country = "", city = "") => {
  return axios.get(`/api/location?country=${country}&city=${city}`);
};
export const addLocation = (location) => {
  return axios.post(`/api/location`, location);
};
export const deleteLocation = (location_id) => {
  return axios.delete(`/api/location/${location_id}`);
};

export const getSessions = (page = 1) => {
  return axios.get(`/api/sessions?page=${page}`);
};
export const getSessionMessages = (sessionId) => {
  return axios.get(`/api/sessions/${sessionId}/messages`);
};
export const postMessage = (sessionId, message) => {
  return axios.post(`/api/sessions/${sessionId}/messages`, message);
};

export const getNotifications = (userId) => {
  return axios.get(`/api/users/${userId}/notifications`);
};
export const deleteNotification = (notificationId) => {
  return axios.delete(`/api/notifications/${notificationId}`);
};
export const deleteMessageNotifications = (sessionId) => {
  return axios.delete(`/api/sessions/${sessionId}/notifications`);
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

export const getTopics = (userId) => {
  return axios.get(`/api/users/${userId}/topics`);
};

export const postTopicAnswer = (topicId, answer) => {
  return axios.post(`/api/topics/${topicId}/answers`, answer);
};

export const getAuthUser = () => {
  return axios.get("/api/user");
};
export const signup = (user) => {
  return axios.post("/api/users", user);
};

export const getLikes = (type = "", page = 1) => {
  return axios.get(`/api/swipes/users?type=${type}&page=${page}`);
};

export const postSwipe = (swipe) => {
  return axios.post("/api/swipes", swipe);
};
export const deleteSwipe = (swipeId) => {
  return axios.delete(`/api/swipes/${swipeId}`);
};

export const getUsers = (page = 1) => {
  return axios.get(`/api/users?page=${page}`);
};
export const getUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
};
export const putUser = (user, userId) => {
  return axios.put(`/api/users/${userId}`, user);
};
