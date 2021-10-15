import * as apiCalls from "../../api/apiCalls";
import { SWIPE } from "./types";

export const postSwipe = (swipe) => (dispatch) => {
  return apiCalls.postSwipe(swipe).then((response) => {
    dispatch({
      type: SWIPE,
      payload: response.data.data,
    });
  });
};
