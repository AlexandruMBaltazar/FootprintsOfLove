import {
  ADD_MESSAGE_NOTIFICATION,
  ADD_MATCH_NOTIFICATION,
  FETCH_NOTIFICATIONS,
  DELETE_MESSAGE_NOTIFICATIONS,
  ADD_LIKE_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "../../actions/notifications/types";

const initialState = {
  messageNotifications: [],
  likeNotifications: [],
  matchNotifications: [],
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
        matchNotifications: action.payload.filter(
          (notification) => notification.type === "notification.match"
        ),
      };

    case ADD_MESSAGE_NOTIFICATION:
      return {
        ...state,
        messageNotifications: [action.payload, ...state.messageNotifications],
      };

    case ADD_MATCH_NOTIFICATION:
      return {
        ...state,
        matchNotifications: [action.payload, ...state.matchNotifications],
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
        matchNotifications: state.matchNotifications.filter(
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
