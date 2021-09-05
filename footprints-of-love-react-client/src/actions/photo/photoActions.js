import * as apiCalls from "../../api/apiCalls";
import {
  UPLOAD_PHOTO,
  IS_UPLOADING_PHOTO,
  IS_FETCHING_PHOTOS,
  UPLOAD_PHOTO_FAIL,
  CLEAR_UPLOAD_PHOTO_ERRORS,
  FETCH_PHOTOS,
  REMOVE_PHOTO,
} from "./types";

export const getPhotos = (userId) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_PHOTOS,
  });
  return apiCalls.getPhotos(userId).then((response) => {
    dispatch({
      type: FETCH_PHOTOS,
      payload: response.data.data,
    });
  });
};

export const uploadPhoto = (userId, photo) => (dispatch) => {
  dispatch({
    type: IS_UPLOADING_PHOTO,
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

export const deletePhoto = (photoId) => (dispatch) => {
  return apiCalls.deletePhoto(photoId).then((response) => {
    dispatch({
      type: REMOVE_PHOTO,
      payload: response.data.data,
    });
  });
};

export const clearUploadPhotoErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_UPLOAD_PHOTO_ERRORS,
  });
};
