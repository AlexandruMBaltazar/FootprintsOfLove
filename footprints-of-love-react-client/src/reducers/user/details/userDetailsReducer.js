import {
  FETCH_USER_DETAILS,
  LOADING_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from "../../../actions/user/details/types";

import {
  LOCATION_ADDED,
  REMOVE_LOCATION,
} from "../../../actions/location/types";

const initialState = {
  details: {
    user: { value: "" },
    body_type: { value: "" },
    child: { value: "" },
    diet: { value: "" },
    drink: { value: "" },
    education: { value: "" },
    employment: { value: "" },
    ethnicity: { value: "" },
    gender: { value: "" },
    height: "",
    language: { value: "" },
    pet: { value: "" },
    politics: { value: "" },
    relationship: { value: "" },
    religion: { value: "" },
    sign: { value: "" },
    smoke: { value: "" },
    location: {
      city: "",
      country: "",
      lat: null,
      long: null,
    },
    dob: "",
  },
  isLoading: false,
};

export default function userDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return {
        details: {
          ...state.details,
          ...action.payload,
        },
        isLoading: false,
      };

    case UPDATE_USER_DETAILS:
      return {
        details: {
          ...state.details,
          ...action.payload,
        },
        isLoading: false,
      };

    case LOCATION_ADDED:
      return {
        details: {
          ...state.details,
          location: action.payload,
        },
        isLoading: false,
      };

    case REMOVE_LOCATION:
      return {
        details: {
          ...state.details,
          location: initialState.details.location,
        },
        isLoading: false,
      };

    case LOADING_USER_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
