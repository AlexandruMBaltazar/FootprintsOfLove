import {
  FETCH_USER_DETAILS,
  LOADING_USER_DETAILS,
  UPDATE_USER_DETAILS,
} from "../../../actions/user/details/types";

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
    dob: "",
  },
  isLoading: false,
};

export default function authReducer(state = initialState, action) {
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

    case LOADING_USER_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}
