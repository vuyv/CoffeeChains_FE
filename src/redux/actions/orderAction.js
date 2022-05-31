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

export const createOrder = (order) => {
  return function (dispatch) {
    console.log({
      discount_code: order.discountCode,
      totalPrice: order.appliedDiscountTotal,
      orderDetails: order.cartItems,
    });
    const headers = setAuthHeaders();
    axios
      .post(
        `${process.env.REACT_APP_HOST}/order/new`,
        {
          discount_code: order.discountCode,
          totalPrice: order.appliedDiscountTotal,
          orderDetails: order.cartItems,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Order Successfully", { autoClose: 1100 });
        dispatch({
          type: "CREATE_ORDER",
          payload: res.data,
        });
        dispatch(loadOrderById(res.data.id));
      })
      .catch((error) => toast.error(error));
  };
};

export const createFakeOrder = (order) => {
  return function (dispatch) {
    console.log({
      discount_code: order.discountCode,
      orderDetails: order.cartItems,
      date: order.date,
    });
    const headers = setAuthHeaders();
    axios
      .post(
        `${process.env.REACT_APP_HOST}/order/new`,
        {
          discount_code: order.discountCode,
          date: order.date,
          employeeId: order.employeeId,
          orderDetails: order.cartItems,
        },
        headers
      )
      .then((res) => {
        // toast.success("Create Order Successfully", { autoClose: 1100 });
        dispatch({
          type: "CREATE_ORDER",
          payload: res.data,
        });
        // dispatch(loadOrderById(res.data.id));
      })
      .catch((error) => toast.error(error));
  };
};

export const loadOrdersInADayInBranch = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/daily/${date}`,
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

export const loadOrdersInAWeekInBranch = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/weekly/${date}`,
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

export const loadOrdersInAMonthInBranch = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/monthly/${date}`,
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
