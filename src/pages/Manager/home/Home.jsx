import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../../pages/Manager/navbar/Navbar";
import "./home.scss";
import WidgetManager from "../../../components/widgetManager/WidgetManager";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getCountOfBranchEmployee,
  getDailyOrders,
  getDailyEarnings,
  getWeeklyEarnings,
  getBestSellingProducts,
  getMonthlyOrderQuantity,
} from "../../../redux/actions/managerStatistics";
import ColumnChart from "../../../components/columnChart/ColumnChart";
import HorizontalBarChart from "../../../components/horizontalBarChart/HorizontalBarChart";
import { format } from "date-fns";
import FeaturedManager from "../featured/FeaturedManager";
import OrderColumnChart from "../../../components/columnChart/OrderColumnChart";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Home = () => {
  const dispatch = useDispatch();
  const currentDay = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(getBestSellingProducts(currentDay));
    dispatch(getCountOfBranchEmployee());
    dispatch(getDailyOrders(currentDay));
    dispatch(getDailyEarnings(currentDay));
    dispatch(getWeeklyEarnings(currentDay));

    dispatch(getMonthlyOrderQuantity());
  }, []);

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
            <FeaturedManager />
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
              Best Selling Products Last Months
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
                      {row[2] ==1 && (
                        <TableCell align="right">{row[2]} order</TableCell>
                      )}
                      {row[2] != 1 && (
                        <TableCell align="right">{row[2]} orders</TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            Monthly Total Orders By Status
          </div>
          <div style={{ textAlign: "center", margin: "auto" }}>
            <ColumnChart dates={dates} totals={totals} />
            Weekly Revenue
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
