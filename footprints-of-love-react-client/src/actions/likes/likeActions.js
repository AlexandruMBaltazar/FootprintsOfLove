import { FETCH_LIKES, IS_FETCHING_LIKES, CLEAR_LIKES } from "./types";
import * as apiCalls from "../../api/apiCalls";

export const fetchLikes =
  (type, page = 1) =>
  (dispatch) => {
    dispatch({
      type: IS_FETCHING_LIKES,
      payload: true,
    });
    return apiCalls.getLikes(type, page).then((response) => {
      dispatch({
        type: FETCH_LIKES,
        payload: response.data,
      });
    });
  };

export const clearLikes = () => (dispatch) => {
  dispatch({
    type: CLEAR_LIKES,
    payload: true,
  });
};
