import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
// import "./home.scss";
import WidgetManager from "../../../../components/widgetManager/WidgetManager";
import Featured from "../../../../components/featured/Featured";
import Chart from "../../../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getBestSellingProductsEachBranch,
  getCountOfEachBranchEmployee,
  getDailyOrdersEachBranch,
  getDailyEarningsEachBranch,
  getWeeklyEarningsEachBranch,
  getMonthlyOrderQuantityEachBranch,
  getCurrentWeekRevenueEachBranch,
  getCurrentMonthRevenueEachBranch,
  compareLastMonthRevenue1EachBranch,
} from "../../../../redux/actions/managerStatistics";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import ColumnChart from "../../../../components/columnChart/ColumnChart";
import HorizontalBarChart from "../../../../components/horizontalBarChart/HorizontalBarChart";
import { format } from "date-fns";
import FeaturedManager from "../../../Manager/featured/FeaturedManager";
import OrderColumnChart from "../../../../components/columnChart/OrderColumnChart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";

function BranchDetail(props) {
  const dispatch = useDispatch();
  const currentDay = format(new Date(), "yyyy-MM-dd");
  let { branchId } = useParams();
  useEffect(() => {
    dispatch(getBestSellingProductsEachBranch(currentDay, branchId));
    dispatch(getCountOfEachBranchEmployee(branchId));
    dispatch(getDailyOrdersEachBranch(currentDay, branchId));
    dispatch(getDailyEarningsEachBranch(currentDay, branchId));
    dispatch(getWeeklyEarningsEachBranch(currentDay, branchId));
    dispatch(getMonthlyOrderQuantityEachBranch(branchId));
    dispatch(getCurrentWeekRevenueEachBranch(branchId));
    dispatch(getCurrentMonthRevenueEachBranch(branchId));
    dispatch(compareLastMonthRevenue1EachBranch(branchId));
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

  const countOfEmployee = useSelector(
    (state) => state.managerStatisticsReducer.countOfEmployee
  );

  const dailyOrders = useSelector(
    (state) => state.managerStatisticsReducer.dailyOrders
  );

  const dailyEarnings = useSelector(
    (state) => state.managerStatisticsReducer.dailyEarnings
  );

  const weeklyEarnings = useSelector(
    (state) => state.managerStatisticsReducer.weeklyEarnings
  );

  const monthlyOrderQuantity = useSelector(
    (state) => state.managerStatisticsReducer.monthlyOrderQuantity
  );

  const dates = [];
  const getDate = weeklyEarnings.map((item) => {
    dates.push(item[0]);
  });

  const totals = [];
  const getTotal = weeklyEarnings.map((item) => totals.push(item[1]));

  const month = [];
  const getMonth = monthlyOrderQuantity.map((item) => month.push(item[0]));

  const sold = [];
  const getSold = monthlyOrderQuantity.map((item) => sold.push(item[1]));

  const cancel = [];
  const getCancel = monthlyOrderQuantity.map((item) => cancel.push(item[2]));

  const bestSellingProducts = useSelector(
    (state) => state.managerStatisticsReducer.bestSellingProducts
  );

  const products = [];
  const getProducts = bestSellingProducts.map((item) => products.push(item[0]));

  const quantities = [];
  const getQuantity = bestSellingProducts.map((item) =>
    quantities.push(item[1])
  );
  const topWeeklySeller = useSelector(
    (state) => state.ownerStatisticsReducer.topWeeklySeller
  );
  const branchs = [];
  const getBranch = topWeeklySeller.map((item) => branchs.push(item[0]));

  const total = [];
  const getTotals = topWeeklySeller.map((item) => total.push(item[1]));

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <span className="">Coffee</span>
        <div className="widgets">
          <WidgetManager type="order" count={dailyOrders} />
          <WidgetManager
            type="earning"
            count={formatter.format(dailyEarnings)}
          />
          <WidgetManager type="employee" count={countOfEmployee} />
        </div>
        <div className="charts">
          <div style={{ width: "40%", margin: 30 }}>
            <div className="featured">
              <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
              </div>
              <div className="bottom">
                <div className="featuredChart">
                  <CircularProgressbar
                    value={70}
                    text={"70%"}
                    strokeWidth={5}
                  />
                </div>
                <p className="title">Total revenue made month</p>
                <p className="amount">
                  {formatter.format(currentMonthRevenue)}
                </p>
                <p className="desc">
                  Previous transactions processing. Last payments may not be
                  included.
                </p>
                <div className="summary">
                  <div className="item">
                    <div className="itemTitle">Current Week</div>

                    <div className="itemResult">
                      <div
                        className="resultAmount"
                        style={{ fontWeight: "bold" }}
                      >
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
          </div>

          <div style={{ textAlign: "center", margin: "auto" }}>
            <div
              style={{
                width: "560px",
                marginRight: "60px",
                textAlign: "center",
              }}
            >
              <HorizontalBarChart
                vertical={products}
                horizontal={quantities}
                type="bestSeller"
              />
              Best Selling Products Last Month
            </div>
          </div>
        </div>

        <div className="charts">
          <div style={{ textAlign: "center", margin: "auto" }}>
            {/* <OrderColumnChart month={month} sold={sold} cancel={cancel} /> */}
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 500, minHeight: 400 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>

                    <TableCell align="right">Total Sold</TableCell>
                    <TableCell align="right">Total Canceled </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {monthlyOrderQuantity.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}/2022
                      </TableCell>
                      <TableCell align="right">{row[1]} orders</TableCell>
                      <TableCell align="right">{row[2]} orders</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            Monthly Orders Status
          </div>
          <div style={{ textAlign: "center", margin: "auto" }}>
            <ColumnChart dates={dates} totals={totals} />
            Last 7 days revenue
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchDetail;
