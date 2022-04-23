import {
  CALL_PLACED,
  SET_SIGNAL,
  INCOMING_CALL,
  CLOSE_CALL,
  SET_PEER,
} from "./types";
import * as apiCalls from "../../api/apiCalls";

export const placeCall = (userId) => (dispatch) => {
  dispatch({
    type: CALL_PLACED,
    payload: userId,
  });
};

export const setPeer = (data) => (dispatch) => {
  dispatch({
    type: SET_PEER,
    payload: data,
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

export const closeCallPlaced = (userId) => (dispatch) => {
  return apiCalls.postCloseCall(userId).then((response) => {
    dispatch({
      type: CLOSE_CALL,
      payload: userId,
    });
  });
};

export const closeCall = () => (dispatch) => {
  dispatch({
    type: CLOSE_CALL,
    payload: true,
  });
};
