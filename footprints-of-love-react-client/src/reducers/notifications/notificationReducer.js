import {
  ADD_MESSAGE_NOTIFICATION,
  FETCH_NOTIFICATIONS,
  DELETE_MESSAGE_NOTIFICATIONS,
  ADD_LIKE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "../../actions/notifications/types";

const initialState = {
  messageNotifications: [],
  likeNotifications: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        messageNotifications: action.payload.filter(
          (notification) => notification.type === "notification.message"
        ),
        likeNotifications: action.payload.filter(
          (notification) => notification.type === "notification.like"
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

    case DELETE_NOTIFICATION:
      return {
        ...state,
        likeNotifications: state.likeNotifications.filter(
          (notification) => notification.id !== action.payload.id
        ),
      };

    case ADD_LIKE_NOTIFICATION:
      return {
        ...state,
        likeNotifications: [action.payload, ...state.likeNotifications],
      };

    default:
      return state;
  }
}
