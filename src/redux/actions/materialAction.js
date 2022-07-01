import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { estimateProducts } from "./productAction";
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
  return function (dispatch) {
    axios
      .post(
        `${process.env.REACT_APP_HOST}/material/addToInventory`,
        arr,
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

export const exportMaterials = (arr) => {
  return function (dispatch) {
    axios
      .post(
        `${process.env.REACT_APP_HOST}/material/exportInventory/`,
        arr,
        headers
      )
      .then((res) => {
        toast.success("Export Successful!");
        dispatch({
          type: "EXPORT_MATERIALS",
          payload: res.data,
        });
        dispatch(getMaterialsByBranch());
        dispatch(estimateProducts());
      })
      .catch((error) => {
       
        // toast.error("Export Fail!")
      });
  };
};

export const clearExportMaterials = () => {
  return function (dispatch) {
    dispatch({
      type: "CLEAR_EXPORT_MATERIAL_ARRAY",
    });
  };
};

export const countDailyQuantityByTime = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/dailyInventory/daily/countQuantity/`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COUNT_DAILY_QUANTITY_BY_TIME",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyInventoryByTime = (time) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/dailyInventory/${time}`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_DAILY_INVENTORY_BY_TIME",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const countWeeklyQuantityByTime = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/dailyInventory/weekly/countQuantity/`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COUNT_WEEKLY_QUANTITY_BY_DATE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const countMonthlyQuantityByTime = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/dailyInventory/monthly/countQuantity/`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COUNT_MONTHLY_QUANTITY_BY_DATE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const createMaterial = (material) => {
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_HOST}/material/new`, material, headers)
      .then((res) => {
        toast.success("Create Successfully");
        dispatch({
          type: "CREATE_MATERIAL",
          payload: res.data,
        });
        dispatch(getMaterials());
      })
      .catch((error) => toast.error(error));
  };
};
