import { CALL_PLACED, SET_SIGNAL, INCOMING_CALL, SET_PEER } from "./types";
import * as apiCalls from "../../api/apiCalls";

export const placeCall = (userId) => (dispatch) => {
  dispatch({
    type: CALL_PLACED,
    payload: userId,
  });
};

export const setSignal =
  (signal, isIncomingSignal = false) =>
  (dispatch) => {
    if (isIncomingSignal) {
      dispatch({
        type: INCOMING_CALL,
        payload: signal,
      });
    } else {
      dispatch({
        type: SET_SIGNAL,
        payload: signal,
      });
    }
  };

export const setPeer = (peer) => (dispatch) => {
  dispatch({
    type: SET_PEER,
    payload: peer,
  });
};
