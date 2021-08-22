const initialState = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "login-success":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
