import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

const headers = setAuthHeaders();

export const getMaterials = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/material/all`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_MATERIALS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const addToMaterialArray = (material) => {
  return function (dispatch) {
    dispatch({
      type: "ADD_TO_MATERIAL_ARRAY",
      payload: material,
    });
  };
};

export const removeFromMaterialArray = (material) => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_FROM_MATERIAL_ARRAY",
      payload: material,
    });
  };
};

export const getMaterialById = (materialId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/material/` + materialId,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_MATERIAL_BY_ID",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getMaterialsByBranch = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/material/branch/`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_MATERIALS_BY_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const addMaterialsToInventory = (arr) => {
  const materialArr = [];
  arr.forEach((material) => {
    materialArr.push({
      materialId: material.id,
      quantity: material.quantity,
      unitId: material.units.id,
    });
  });
  return function (dispatch) {
    axios
      .post(
        `${process.env.REACT_APP_HOST}/material/addToInventory`,
        materialArr,
        headers
      )
      .then((res) => {
        dispatch({
          type: "ADD_MATERIALS",
          payload: res.data,
        });
        toast.success("Add Materials Successfully");
        dispatch(getMaterialsByBranch());
      })
      .catch((error) => toast.error(error));
  };
};

export const clearMaterials = () => {
  return function (dispatch) {
    dispatch({
      type: "CLEAR_MATERIAL_ARRAY",
    });
  };
};
