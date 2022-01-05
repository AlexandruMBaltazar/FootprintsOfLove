import {
  ADD_MESSAGE_NOTIFICATION,
  FETCH_NOTIFICATIONS,
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

    default:
      return state;
  }
}
