import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { createRecipe, getRecipeByProduct, updateRecipe } from "./recipeAction";
toast.configure();

const getProducts = (products) => ({
  type: "GET_PRODUCTS",
  payload: products,
});

export const loadProducts = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/product/all`, setAuthHeaders())
      .then((res) => {
        dispatch(getProducts(res.data));
      })
      .catch((error) => toast.error(error));
  };
};

export const loadProductById = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/product/` + id, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_PRODUCT_BY_ID",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const createProduct = (name, price, categoryId, image, arr) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .post(
        `${process.env.REACT_APP_HOST}/product/new`,
        {
          name,
          price,
          categoryId,
          image,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Product Successfully");
        dispatch({
          type: "CREATE_PRODUCT",
          payload: res.data,
        });

        const materialArr = [];
        arr.forEach((material) => {
          materialArr.push({
            productId: res.data.id,
            materialId: material.materialId,
            amount: material.amount,
          });
        });

        dispatch(createRecipe(materialArr));

        // dispatch(loadProducts());
      })
      .catch((error) => toast.error(error));
  };
};

export const updateProduct = (id, name, price, categoryId, image, arr) => {
  return function (dispatch) {
    const headers = setAuthHeaders();
    axios
      .put(
        `${process.env.REACT_APP_HOST}/product/` + id,
        {
          name,
          price,
          categoryId,
          image,
        },
        headers
      )
      .then((res) => {
        toast.success("Update Product Successfully");
        dispatch({
          type: "UPDATE_PRODUCT",
          payload: res.data,
        });
        const materialArr = [];
        arr.forEach((material) => {
          materialArr.push({
            productId: res.data.id,
            materialId: material.materialId,
            amount: material.amount,
          });
        });
        dispatch(updateRecipe(materialArr))
        dispatch(getRecipeByProduct(res.data.id))
        dispatch(loadProducts());
      })
      .catch((error) => toast.error(error));
  };
};

export const disableProduct = (id) => {
  return function (dispatch) {
    axios
      .put(
        `${process.env.REACT_APP_HOST}/product/disable/` + id,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DISABLE_PRODUCT",
          payload: res.data,
        });
        dispatch(loadProducts());
      })
      .catch((error) => toast.error(error));
  };
};

export const loadProductByCategory = (categoryId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/product/category/` + categoryId,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_PRODUCT_BY_CATEGORY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadActiveProductByCategory = (categoryId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/product/?categoryId=${categoryId}&status=available`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ACTIVE_PRODUCT_BY_CATEGORY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadActiveProducts = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/product/status/?status=available`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ACTIVE_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};
