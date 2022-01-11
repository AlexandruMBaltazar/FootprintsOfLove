import { FETCH_USERS_THAT_LIKES_YOU, IS_FETCHING_LIKES } from "./types";
import * as apiCalls from "../../api/apiCalls";

export const fetchLikes = (type) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_LIKES,
    payload: true,
  });
  return apiCalls.getLikes(type).then((response) => {
    dispatch({
      type: FETCH_USERS_THAT_LIKES_YOU,
      payload: response.data.data,
    });
  });
};
