import * as apiCalls from "../../api/apiCalls";
import { SWIPE } from "./types";

export const swipe = (swipe) => (dispatch) => {
  return apiCalls.postSwipe(swipe).then((response) => {
    dispatch({
      type: SWIPE,
      payload: response.data.data,
    });
  });
};

export const unmatch = (swipe) => (dispatch) => {
  return apiCalls.deleteSwipe(swipe).then((response) => {
    dispatch({
      type: SWIPE,
      payload: response.data.data,
    });
  });
};
