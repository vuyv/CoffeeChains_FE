import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useDispatch, useSelector } from "react-redux";
import React, {  useEffect } from "react";
import {
  compareLastMonthRevenue1,
  getCurrentWeekRevenue,
  getCurrentMonthRevenue,
} from "../../../redux/actions/managerStatistics";

const FeaturedManager = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentWeekRevenue());
    dispatch(getCurrentMonthRevenue());
    dispatch(compareLastMonthRevenue1());
  }, []);

  const currentWeekRevenue = useSelector(
    (state) => state.managerStatisticsReducer.currentWeekRevenue
  );

  const currentMonthRevenue = useSelector(
    (state) => state.managerStatisticsReducer.currentMonthRevenue
  );

  const compareLastMonthRevenue = useSelector(
    (state) => state.managerStatisticsReducer.compareLastMonthRevenue
  );

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total revenue made month</p>
        <p className="amount">{formatter.format(currentMonthRevenue)}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Current Week</div>

            <div className="itemResult">
              <div className="resultAmount" style={{ fontWeight: "bold" }}>
                {formatter.format(currentWeekRevenue)}
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>

            {compareLastMonthRevenue > 0 && (
              <div className="itemResult positive">
                <KeyboardArrowUpOutlinedIcon fontSize="small" />
                <div className="resultAmount">
                  {formatter.format(compareLastMonthRevenue)}
                </div>
              </div>
            )}

            {compareLastMonthRevenue < 0 && (
              <div className="itemResult negative">
                <KeyboardArrowDownIcon fontSize="small" />
                <div className="resultAmount">
                  {formatter.format(Math.abs(compareLastMonthRevenue))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedManager;
