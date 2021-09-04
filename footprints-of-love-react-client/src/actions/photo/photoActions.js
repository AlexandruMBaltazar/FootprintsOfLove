import * as apiCalls from "../../api/apiCalls";
import { UPLOAD_PHOTO } from "./types";

export const uploadPhoto = (userId, photo) => (dispatch) => {
  return apiCalls.postPhoto(userId, photo).then((response) => {
    dispatch({
      type: UPLOAD_PHOTO,
      payload: response.data.data,
    });
  });
};
