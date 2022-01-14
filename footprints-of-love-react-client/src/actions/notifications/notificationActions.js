import {
  ADD_MESSAGE_NOTIFICATION,
  ADD_LIKE_NOTIFICATION,
  ADD_MATCH_NOTIFICATION,
  FETCH_NOTIFICATIONS,
  DELETE_MESSAGE_NOTIFICATIONS,
  DELETE_NOTIFICATION,
} from "./types";
import * as apiCalls from "../../api/apiCalls";
import * as messageActions from "../messages/messageActions";

export const addMessageNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE_NOTIFICATION,
    payload: notification,
  });
};

export const deleteMessageNotifications = (sessionId) => (dispatch) => {
  return apiCalls.deleteMessageNotifications(sessionId).then((response) => {
    dispatch({
      type: DELETE_MESSAGE_NOTIFICATIONS,
      payload: sessionId,
    });
  });
};

export const addLikeNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_LIKE_NOTIFICATION,
    payload: notification,
  });
};

export const addMatchNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_MATCH_NOTIFICATION,
    payload: notification,
  });
};

export const fetchNotifications = (userId) => (dispatch) => {
  return apiCalls.getNotifications(userId).then((response) => {
    dispatch({
      type: FETCH_NOTIFICATIONS,
      payload: response.data.data,
    });
  });
};

export const deleteNotification = (notificationId) => (dispatch) => {
  return apiCalls.deleteNotification(notificationId).then((response) => {
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: response.data.data,
    });
  });
};

export const notificationHandler = (notification) => (dispatch, getState) => {
  const state = getState();

  const { message } = state;

  const { isSessionOpen, sessionDetails } = message;
  const { session_id } = sessionDetails;

  switch (notification.type) {
    case "notification.message":
      if (isSessionOpen && notification.session_id === session_id) {
        dispatch(messageActions.messageReceived(notification));
      } else {
        dispatch(addMessageNotification(notification));
      }

      break;

    case "notification.like":
      dispatch(addLikeNotification(notification));
      break;

    case "notification.match":
      dispatch(addMatchNotification(notification));
      break;

    default:
      break;
  }
};
