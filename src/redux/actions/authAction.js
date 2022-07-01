import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

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
          type: "LOG_IN_SUCCESS",
          token: token.data.accessToken,
        });
      })
      .catch((error) => {
        dispatch({
          type: "LOG_IN_FAILED",
          payload: error,
        });
        toast.error("Username or password is incorrect");
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
