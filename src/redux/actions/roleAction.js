import axios from "axios";
import { setAuthHeaders } from "../../utils/index";

const getRoles = (roles) => ({
  type: "GET_ROLES",
  payload: roles,
});

export const loadRoles = () => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_HOST}/roles`, setAuthHeaders())
      .then((res) => {
        dispatch(getRoles(res.data));
      })
      .catch((error) => console.log(error));
  };
};
