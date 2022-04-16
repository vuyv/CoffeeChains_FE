import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

const headers = setAuthHeaders();

const getOrders = (orders) => ({
  type: "GET_ORDERS",
  payload: orders,
});

export const loadOrders = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/order/all`, setAuthHeaders())
      .then((res) => {
        dispatch(getOrders(res.data));
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrderById = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/order/` + id, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_ORDER_BY_ID",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrderInBranch = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/order/branch/all`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_ORDERS_IN_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrderByIdInBranch = (branchId, orderId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/` + branchId + "/" + orderId,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDER_BY_ID_IN_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const cancelOrder = (id) => {
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_HOST}/order/cancel/` + id, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "CANCEL_ORDER",
          payload: res.data,
        });
        dispatch(loadOrderById(id));
      })
      .catch((error) => toast.error(error));
  };
};

export const removeOrder = () => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_ORDER",
    });
  };
};

export const loadOrderByOrdinalNumber = (ordinalNumber) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/find/` + ordinalNumber,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDER_BY_ORDINAL_NUMBER",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrdersInADayInBranch = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/find/day`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDERS_IN_A_DAY_IN_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrdersInAWeekInBranch = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/find/week`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDERS_IN_A_WEEK_IN_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrdersInAMonthInBranch = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/find/month`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_ORDERS_IN_A_MONTH_IN_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};