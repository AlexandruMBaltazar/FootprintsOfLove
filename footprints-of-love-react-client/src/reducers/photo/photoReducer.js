import {
  UPLOAD_PHOTO,
  PENDING_API_CALL,
  UPLOAD_PHOTO_FAIL,
  CLEAR_UPLOAD_PHOTO_ERRORS,
  FETCH_PHOTOS,
} from "../../actions/photo/types";

const initialState = {
  photos: [],
  uploadPhotoErrors: [],
  pendingApiCall: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        photos: action.payload,
        pendingApiCall: false,
      };

    case UPLOAD_PHOTO:
      return {
        photos: [action.payload, ...state.photos],
        pendingApiCall: false,
      };

    case UPLOAD_PHOTO_FAIL:
      return {
        ...state,
        uploadPhotoErrors: action.payload,
        pendingApiCall: false,
      };

    case CLEAR_UPLOAD_PHOTO_ERRORS:
      return {
        ...state,
        uploadPhotoErrors: [],
      };

    case PENDING_API_CALL:
      return {
        ...state,
        pendingApiCall: true,
      };

    default:
      return state;
  }
}
