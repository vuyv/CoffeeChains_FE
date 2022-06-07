import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const createRecipe = (arr) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .post(`${process.env.REACT_APP_HOST}/recipe/new`, arr, headers)
      .then((res) => {
        dispatch({
          type: "CREATE_RECIPE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getRecipeByProduct = (id) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/recipe/byProduct/` + id,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_RECIPE_BY_PRODUCT",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const updateRecipe = (arr) => {
return function (dispatch) {
  const headers = setAuthHeaders();
  axios
    .put(`${process.env.REACT_APP_HOST}/recipe/update`, arr, headers)
    .then((res) => {
      dispatch({
        type: "UPDATE_RECIPE",
        payload: res.data,
      });
    })
    .catch((error) => toast.error(error));
};
}
