import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const getReportByTime = (type, timeRange, categoryId, date) => {
  if (categoryId == null) {
    categoryId = 0;
  }
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/report/owner?type=${type}&timeRange=${timeRange}&date=${date}&categoryId=${categoryId}`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "REPORT_BY_TIME",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};

