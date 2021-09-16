import {
  FETCH_USER_PREFERENCES,
  LOADING_USER_PREFERENCES,
  POST_USER_PREFERENCES,
  POSTING_USER_PREFERENCES,
} from "../../../actions/user/preference/types";

const initialState = {
  preferences: {
    user: {},
    body_type: { values: [], is_important: "" },
    child: { values: [], is_important: "" },
    diet: { values: [], is_important: "" },
    drink: { values: [], is_important: "" },
    education: { values: [], is_important: "" },
    employment: { values: [], is_important: "" },
    ethnicity: { values: [], is_important: "" },
    gender: { values: [], is_important: "" },
    height: {},
    language: { values: [], is_important: "" },
    pet: { values: [], is_important: "" },
    politics: { values: [], is_important: "" },
    relationship: { values: [], is_important: "" },
    religion: { values: [], is_important: "" },
    sign: { values: [], is_important: "" },
    smoke: { values: [], is_important: "" },
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
