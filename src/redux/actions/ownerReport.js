import axios from "axios";
import { setAuthHeaders } from "../../utils/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
toast.configure();

export const getDailyRevenueAllBranch = () => {
  return function (dispatch) {
    axios
      .get(
        `${process.env.REACT_APP_HOST}/order/owner/report/revenue/daily/allBranch`,
        setAuthHeaders()
      )
      .then((res) => {
        dispatch({
          type: "DAILY_REVENUE_ALL_BRANCH",
          payload: res.data,
        });
      })
      .catch((error) => toast.error(error));
  };
};
