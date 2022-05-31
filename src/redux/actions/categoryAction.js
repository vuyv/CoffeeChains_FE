import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

const getCategories = (categories) => ({
  type: "GET_CATEGORIES",
  payload: categories,
});

export const loadCategories = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/category/all`, setAuthHeaders())
      .then((res) => {
        dispatch(getCategories(res.data));
      })
      .catch((error) => toast.error(error));
  };
};

export const createCategory = (name, image) => {
  console.log(image);
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .post(
        `${process.env.REACT_APP_HOST}/category/new`,
        {
          name,
          image,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Successfully");
        dispatch({
          type: "CREATE_CATEGORY",
          payload: res.data,
        });
        dispatch(loadCategories());
      })
      .catch((error) => toast.error(error));
  };
};

export const updateCategory = (name, id) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .put(
        `${process.env.REACT_APP_HOST}/category/` + id,
        {
          name,
        },
        headers
      )
      .then((res) => {
        toast.success("Update Successfully");
        dispatch({
          type: "UPDATE_CATEGORY",
          payload: res.data,
        });
        dispatch(loadCategories());
      })
      .catch((error) => toast.error(error));
  };
};
