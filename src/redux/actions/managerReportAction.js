import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const getReportEachBranch = (
  type,
  branch,
  category,
  timeRange,
  date
) => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/report/manager/?type=${type}&timeRange=${timeRange}&category=${category}&branch=${branch}&date=${date}`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "REPORT_EACH_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};
