import * as apiCalls from "../../api/apiCalls";
import {
  UPLOAD_PHOTO,
  PENDING_API_CALL,
  UPLOAD_PHOTO_FAIL,
  CLEAR_UPLOAD_PHOTO_ERRORS,
} from "./types";

export const uploadPhoto = (userId, photo) => (dispatch) => {
  dispatch({
    type: PENDING_API_CALL,
  });
  return apiCalls
    .postPhoto(userId, photo)
    .then((response) => {
      dispatch({
        type: UPLOAD_PHOTO,
        payload: response.data.data,
      });
    })
    .catch((error) => {
      if (error.response.data && error.response.data.errors.photo) {
        dispatch({
          type: UPLOAD_PHOTO_FAIL,
          payload: error.response.data.errors.photo,
        });
      }
    });
};

export const clearUploadPhotoErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_UPLOAD_PHOTO_ERRORS,
  });
};
