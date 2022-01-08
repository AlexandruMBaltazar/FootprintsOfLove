import {
  ADD_MESSAGE_NOTIFICATION,
  FETCH_NOTIFICATIONS,
  DELETE_MESSAGE_NOTIFICATIONS,
} from "../../actions/notifications/types";

const initialState = {
  messageNotifications: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        messageNotifications: action.payload.filter(
          (notification) => notification.type === "notification.message"
        ),
      };

    case ADD_MESSAGE_NOTIFICATION:
      return {
        ...state,
        messageNotifications: [action.payload, ...state.messageNotifications],
      };

    case DELETE_MESSAGE_NOTIFICATIONS:
      return {
        ...state,
        messageNotifications: [
          ...state.messageNotifications.filter(
            (notification) => notification.session_id !== action.payload
          ),
        ],
      };

    default:
      return state;
  }
}
