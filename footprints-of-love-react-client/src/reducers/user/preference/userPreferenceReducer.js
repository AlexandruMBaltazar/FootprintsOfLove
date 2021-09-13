import {
  FETCH_USER_PREFERENCES,
  LOADING_USER_PREFERENCES,
  POST_USER_PREFERENCES,
  POSTING_USER_PREFERENCES,
} from "../../../actions/user/preference/types";

const initialState = {
  preferences: {
    user: {},
    body_type: [],
    child: [],
    diet: [],
    drink: [],
    education: [],
    employment: [],
    ethnicity: [],
    gender: [],
    height: {},
    language: [],
    pet: [],
    politics: [],
    relationship: [],
    religion: [],
    sign: [],
    smoke: [],
    age: {},
  },
  isLoadingUserPreferences: false,
  isPostingUserPreferences: false,
};

export default function userPreferenceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
        isLoadingUserPreferences: false,
      };

    case LOADING_USER_PREFERENCES:
      return {
        ...state,
        isLoadingUserPreferences: action.payload,
      };

    case POST_USER_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload,
        },
        isPostingUserPreferences: false,
      };

    case POSTING_USER_PREFERENCES:
      return {
        ...state,
        isPostingUserPreferences: action.payload,
      };

    default:
      return state;
  }
}
