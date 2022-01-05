import { ADD_MESSAGE_NOTIFICATION, FETCH_NOTIFICATIONS } from "./types";
import * as apiCalls from "../../api/apiCalls";
import * as messageActions from "../messages/messageActions";

export const addMessageNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE_NOTIFICATION,
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

    default:
      break;
  }
};
