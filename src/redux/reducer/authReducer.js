import jwtDecode from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  role: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOADED":
    case "LOG_IN_SUCCESS":
      const user = jwtDecode(action.token);
      return {
        ...initialState,
        token: action.token,
        name: user.sub,
        role: user.aud,
      };
    case "LOG_OUT":
      localStorage.removeItem("token");
      localStorage.removeItem("current_user");
      return {
        token: null,
        name: null,
        role: null,
      };
    case "LOG_IN_FAILED":
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
