import axios from "axios";

export const logIn = (username, password) => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_HOST}/login`, {
        username,
        password,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((token) => {
        localStorage.setItem("token", token.data.accessToken);

        dispatch({
          type: "LOG_IN",
          token: token.data.accessToken,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const loadUser = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (token) {
      dispatch({
        type: "USER_LOADED",
        token,
      });
    } else return null;
  };
};

export const logOut = () => {
  return (dispatch) => {
    dispatch({
      type: "LOG_OUT",
    });
  };
};
