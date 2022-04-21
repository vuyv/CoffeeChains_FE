import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

const headers = setAuthHeaders();

export const loadEmployees = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/employee/all`, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_EMPLOYEES",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadEmployeeById = (id) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/employee/` + id, setAuthHeaders())
      .then((res) => {
        dispatch({
          type: "GET_EMPLOYEE_BY_ID",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const loadCurrentUser = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/employee/currentUser`,
        setAuthHeaders()
      )
      .then((res) => {
        localStorage.setItem("current_user", JSON.stringify(res.data));
        dispatch({
          type: "GET_CURRENT_USER",
          payload: res.data,
        });
      })
      // .catch((error) => toast.error(error));
      .catch((error) => console.log(error));
  };
};

export const removeCurrentUser = () => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_CURRENT_USER",
    });
  };
};

export const createEmployee = (
  username,
  name,
  gender,
  birth,
  phone,
  address,
  branchId,
  roleId,
  avatar
) => {
  return function (dispatch) {
    axios
      .post(
        `${process.env.REACT_APP_HOST}/employee/new`,
        {
          username,
          name,
          gender,
          birth,
          phone,
          address,
          branchId,
          roleId,
          avatar,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Successfully");
        dispatch({
          type: "CREATE_EMPLOYEE",
          payload: res.data,
        });
        dispatch(loadEmployees());
      })
      .catch((error) => toast.error(error));
  };
};

export const updateEmployee = (
  id,
  username,
  name,
  gender,
  birth,
  phone,
  address,
  branchId,
  roleId,
  avatar
) => {
  return function (dispatch) {
    axios
      .put(
        `${process.env.REACT_APP_HOST}/employee/` + id,
        {
          username,
          name,
          gender,
          birth,
          phone,
          address,
          branchId,
          roleId,
          avatar,
        },
        headers
      )
      .then((res) => {
        toast.success("Update Successfully");
        dispatch({
          type: "UPDATE_EMPLOYEE",
          payload: res.data,
        });
        dispatch(loadEmployees());
        dispatch(loadCurrentUser());
      })
      .catch((error) => toast.error(error));
  };
};

export const disableEmployees = (id) => {
  return function (dispatch) {
    axios
      .put(
        `${process.env.REACT_APP_HOST}/employee/disable/` + id,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DISABLE_EMPLOYEES",
          payload: res.data,
        });
        dispatch(loadEmployees());
      })
      .catch((error) => toast.error(error));
  };
};

export const loadEmployeesInBranch = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/employee/branch/all`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "GET_EMPLOYEES_BY_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

export const createEmployeeInBranch = (
  username,
  name,
  gender,
  birth,
  phone,
  address,
  avatar
) => {
  return function (dispatch) {
    axios
      .post(
        `${process.env.REACT_APP_HOST}/employee/newInBranch`,
        {
          username,
          name,
          gender,
          birth,
          phone,
          address,
          avatar,
        },
        headers
      )
      .then((res) => {
        toast.success("Create Successfully");
        dispatch({
          type: "CREATE_EMPLOYEE_IN_BRANCH",
          payload: res.data,
        });
        dispatch(loadEmployeesInBranch());
      })
      .catch((error) => toast.error(error));
  };
};

export const disableEmployeeByManager = (id) => {
  return function (dispatch) {
    axios
      .put(
        `${process.env.REACT_APP_HOST}/employee/disable/` + id,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DISABLE_EMPLOYEES_BY_MANAGER",
          payload: res.data,
        });
        dispatch(loadEmployeesInBranch());
      })
      .catch((error) => toast.error(error));
  };
};

export const updateEmployeeInBranch = (
  id,
  username,
  name,
  gender,
  birth,
  phone,
  address,
  branchId,
  roleId,
  avatar
) => {
  return function (dispatch) {
    axios
      .put(
        `${process.env.REACT_APP_HOST}/employee/` + id,
        {
          username,
          name,
          gender,
          birth,
          phone,
          address,
          branchId,
          roleId,
          avatar,
        },
        headers
      )
      .then((res) => {
        toast.success("Update Successfully");
        dispatch({
          type: "UPDATE_EMPLOYEE_IN_BRANCH",
          payload: res.data,
        });
        dispatch(loadEmployeesInBranch());
      })
      .catch((error) => toast.error(error));
  };
};

export const changePassword = (
  id,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  return function (dispatch) {
    axios
      .put(
        `${process.env.REACT_APP_HOST}/employee/changePassword/` + id,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        headers
      )
      .then((res) => {
        toast.success("Change Password Successfully");
        dispatch({
          type: "CHANGE_PASSWORD",
          payload: res.data,
        });
        // dispatch(loadCurrentUser());
      })
      .catch((error) => toast.error(error));
  };
};
