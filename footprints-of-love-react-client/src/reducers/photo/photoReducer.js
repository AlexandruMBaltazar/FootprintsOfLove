import { UPLOAD_PHOTO } from "../../actions/photo/types";

const initialState = {
  photos: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return {
        photos: [action.payload, ...state.photos],
      };

    default:
      return state;
  }
}
