import {
  CALL_PLACED,
  SET_SIGNAL,
  INCOMING_CALL,
  SET_PEER,
} from "../../actions/videoCall/types";

const initialState = {
  userId: null,
  callPlaced: false,
  peer: undefined,
  incomingCall: false,
  signal: null,
  initiator: true,
};

export default function videoCallReducer(state = initialState, action) {
  switch (action.type) {
    case CALL_PLACED:
      return {
        ...state,
        userId: action.payload,
        callPlaced: true,
        incomingCall: false,
      };

    case SET_PEER:
      return {
        ...state,
        peer: { [`${state.userId}`]: action.payload },
      };

    case INCOMING_CALL:
      return {
        ...state,
        incomingCall: true,
        signal: action.payload,
        initiator: false,
      };

    case SET_SIGNAL:
      return {
        ...state,
        signal: action.payload,
      };

    default:
      return state;
  }
}
