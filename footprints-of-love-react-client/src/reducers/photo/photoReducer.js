import {
  UPLOAD_PHOTO,
  IS_UPLOADING_PHOTO,
  UPLOAD_PHOTO_FAIL,
  IS_FETCHING_PHOTOS,
  CLEAR_UPLOAD_PHOTO_ERRORS,
  FETCH_PHOTOS,
  REMOVE_PHOTO,
} from "../../actions/photo/types";

const initialState = {
  photos: [],
  uploadPhotoErrors: [],
  isUploadingPhoto: false,
  isFetchingPhotos: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHOTOS:
      return {
        photos: action.payload,
        isFetchingPhotos: false,
      };

    case UPLOAD_PHOTO:
      return {
        photos: [action.payload, ...state.photos],
        isUploadingPhoto: false,
      };

    case REMOVE_PHOTO:
      return {
        photos: state.photos.filter((photo) => {
          return photo.id !== action.payload.id;
        }),
      };

    case UPLOAD_PHOTO_FAIL:
      return {
        ...state,
        uploadPhotoErrors: action.payload,
        isUploadingPhoto: false,
      };

    case CLEAR_UPLOAD_PHOTO_ERRORS:
      return {
        ...state,
        uploadPhotoErrors: [],
      };

    case IS_UPLOADING_PHOTO:
      return {
        ...state,
        isUploadingPhoto: true,
      };

    case IS_FETCHING_PHOTOS:
      return {
        ...state,
        isFetchingPhotos: true,
      };

    default:
      return state;
  }
}
