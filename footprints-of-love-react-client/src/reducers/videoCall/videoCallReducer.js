import {
  CALL_PLACED,
  SET_SIGNAL,
  INCOMING_CALL,
  CLOSE_CALL,
  SET_PEER,
} from "../../actions/videoCall/types";

const initialState = {
  userId: null,
  callPlaced: false,
  incomingCall: false,
  signal: null,
  initiator: true,
  peer: null,
  stream: null,
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
        peer: action.payload.peer,
        stream: action.payload.stream,
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

    case CLOSE_CALL:
      if (state.stream && state.peer) {
        state.stream.getTracks().forEach((track) => track.stop());
        state.peer.emit("close");
      }

      return {
        ...initialState,
      };

    default:
      return state;
  }
}
