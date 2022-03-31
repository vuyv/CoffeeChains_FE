import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

const getBranchs = (branchs) => ({
  type: "GET_BRANCHS",
  payload: branchs,
});

export const loadBranchs = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/branch/all`, setAuthHeaders())
      .then((res) => {
        dispatch(getBranchs(res.data));
      })
      .catch((error) => toast.error(error));
  };
};

export const createBranch = (name, address) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .post(
        `${process.env.REACT_APP_HOST}/branch/`,
        {
          name,
          address,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Successfully");
        dispatch({
          type: "CREATE_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const updateBranch = (name, address, status, id) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .put(
        `${process.env.REACT_APP_HOST}/branch/` + id,
        {
          name,
          address,
          status,
        },
        headers
      )
      .then((res) => {
        toast.success("Update Successfully");
        dispatch({
          type: "UPDATE_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};
