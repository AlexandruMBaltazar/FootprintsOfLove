import { ADD_MESSAGE_NOTIFICATION } from "../../actions/notifications/types";

const initialState = {
  messageNotifications: [],
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE_NOTIFICATION:
      return {
        ...state,
        messageNotifications: [action.payload, ...state.messageNotifications],
      };

    default:
      return state;
  }
}
