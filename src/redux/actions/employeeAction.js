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
        `${process.env.REACT_APP_HOST}/employee`,
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
      })
      .catch((error) => toast.error(error));
  };
};

export const disableEmployees = (id) => {
  return function (dispatch) {
    axios
      .post(
        `${process.env.REACT_APP_HOST}/employee/disable/` + id,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DISABLE_EMPLOYEES",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};
