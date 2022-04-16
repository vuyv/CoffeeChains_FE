import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const getCountOfAllEmployee = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/employee/countAll`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "COUNT_OF_ALL_EMPLOYEE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getAllDailyOrders = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/owner/count/orderByday/` + date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "ALL_DAILY_ORDERS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getAllDailyEarnings = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/owner/count/totalPriceByday/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "ALL_DAILY_EARNINGS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getAllProducts = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/product/countAll`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "ALL_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyOrdersEachBranch = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/owner/count/ordersByday/eachBranch/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_ORDERS_EACH_BRACH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyTotalPriceEachBranch = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/owner/count/totalPriceByday/eachBranch/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_TOTAL_PRICE_EACH_BRACH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};
