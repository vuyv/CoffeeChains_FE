import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const createUnit = (arr) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .post(`${process.env.REACT_APP_HOST}/unit/new`, arr, headers)
      .then((res) => {
        dispatch({
          type: "CREATE_UNIT",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getAllUnits = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/unit/all`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_ALL_UNITS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

