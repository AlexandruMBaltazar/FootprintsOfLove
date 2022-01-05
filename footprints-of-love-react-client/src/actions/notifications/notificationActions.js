import { ADD_MESSAGE_NOTIFICATION } from "./types";
import * as apiCalls from "../../api/apiCalls";
import * as messageActions from "../messages/messageActions";

export const addMessageNotification = (notification) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE_NOTIFICATION,
    payload: notification,
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
