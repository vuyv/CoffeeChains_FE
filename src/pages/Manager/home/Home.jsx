import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import WidgetManager from "../../../components/widgetManager/WidgetManager";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import Table from "../../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getCountOfBranchEmployee,
  getDailyOrders,
  getDailyEarnings,
  getWeeklyEarnings,
  getBestSellingProducts,
} from "../../../redux/actions/managerStatistics";
import ColumnChart from "../../../components/columnChart/ColumnChart";
import HorizontalBarChart from "../../../components/horizontalBarChart/HorizontalBarChart";

const Home = () => {
  const dispatch = useDispatch();
  const currentDay = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    dispatch(getCountOfBranchEmployee());
    dispatch(getDailyOrders(currentDay));
    dispatch(getDailyEarnings(currentDay));
    dispatch(getWeeklyEarnings());
    dispatch(getBestSellingProducts());
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

  const dates = [];
  const getDate = weeklyEarnings.map((item) => dates.push(item[0]));

  const totals = [];
  const getTotal = weeklyEarnings.map((item) => totals.push(item[1]));

  const bestSellingProducts = useSelector(
    (state) => state.managerStatisticsReducer.bestSellingProducts
  );

  const products = [];
  const getProducts = bestSellingProducts.map((item) => products.push(item[0]));

  const quantities = [];
  const getQuantity = bestSellingProducts.map((item) =>
    quantities.push(item[1])
  );

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <WidgetManager type="employee" count={countOfEmployee} />
          <WidgetManager type="order" count={dailyOrders} />
          <WidgetManager type="earning" count={dailyEarnings.toFixed(2)} />
        </div>
        {/* <ColumnChart dates={arrayDate} totals={arrayTotal} /> */}
        <div className="charts">
          {/* <Featured /> */}
          <div style={{ width: "560px", marginRight: "60px", textAlign: "center" }}>
            <HorizontalBarChart
              vertical={products}
              horizontal={quantities}
              type="bestSeller"
            />
            Best Selling Products
          </div>
          <div style={{textAlign: "center"}}>
            <ColumnChart dates={dates} totals={totals} />
            Weekly Revenue
          </div>
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <BTable />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
