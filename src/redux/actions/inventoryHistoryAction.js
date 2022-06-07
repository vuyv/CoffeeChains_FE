import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

const headers = setAuthHeaders();

export const getDailyInventoryHistory = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/inventoryHistory/daily/countQuantity/`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_INVENTORY_HISTORY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getWeeklyInventoryHistory = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/inventoryHistory/weekly/countQuantity/`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "WEEKLY_INVENTORY_HISTORY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getMonthlyInventoryHistory = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/inventoryHistory/monthly/countQuantity`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "MONTHLY_INVENTORY_HISTORY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getInventoryHistoryByTime = (time) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/inventoryHistory/` + time,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_INVENTORY_HISTORY_BY_TIME",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};