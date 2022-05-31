import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const getCountOfBranchEmployee = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/employee/countOfBranch`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COUNT_OF_BRANCH_EMPLOYEE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyOrders = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/count/orderByday/` + date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_ORDERS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyEarnings = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/count/totalPriceByday/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_EARNINGS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getWeeklyEarnings = (date) => {
  console.log(date);
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/count/lastweek/` + date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "WEEKLY_EARNINGS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getBestSellingProducts = (date) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/topProducts/last3Months/${date}`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "BEST_SELLING_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const compareLastMonthRevenue1 = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/compare/lastMonth`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COMPARE_LAST_MONTH_BRANCH_REVENUE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getCurrentMonthRevenue = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/revenue/currentMonth`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "CURRENT_MONTH_BRANCH_REVENUE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getCurrentWeekRevenue = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/revenue/currentWeek`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "CURRENT_WEEK_BRANCH_REVENUE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getMonthlyOrderQuantity = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/orderQuantity/monthly`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "MONTHLY_ORDER_QUANTITY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

//////------------------------------------------------------///////////
export const getCountOfEachBranchEmployee = (branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/employee/countOfBranch/${branchId}`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COUNT_OF_BRANCH_EMPLOYEE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyOrdersEachBranch = (date, branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/${branchId}/count/orderByday/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_ORDERS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getDailyEarningsEachBranch = (date, branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/${branchId}/count/totalPriceByday/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_EARNINGS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getWeeklyEarningsEachBranch = (date, branchId) => {
  console.log(date);
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/${branchId}/count/lastweek/` +
          date,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "WEEKLY_EARNINGS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getBestSellingProductsEachBranch = (date, branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/branch/${branchId}/topProducts/last3Months/${date}`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "BEST_SELLING_PRODUCTS",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const compareLastMonthRevenue1EachBranch = (branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/${branchId}/compare/lastMonth`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "COMPARE_LAST_MONTH_BRANCH_REVENUE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getCurrentMonthRevenueEachBranch = (branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/${branchId}/revenue/currentMonth`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "CURRENT_MONTH_BRANCH_REVENUE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getCurrentWeekRevenueEachBranch = (branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/${branchId}/revenue/currentWeek`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "CURRENT_WEEK_BRANCH_REVENUE",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const getMonthlyOrderQuantityEachBranch = (branchId) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/manager/${branchId}/orderQuantity/monthly`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "MONTHLY_ORDER_QUANTITY",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

