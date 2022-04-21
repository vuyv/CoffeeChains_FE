import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
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
} from "../../../redux/actions/managerStatistics";
import ColumnChart from "../../../components/columnChart/ColumnChart";

const Home = () => {
  const dispatch = useDispatch();
  const currentDay = new Date().toJSON().slice(0, 10);

  useEffect(() => {
    dispatch(getCountOfBranchEmployee());
    dispatch(getDailyOrders(currentDay));
    dispatch(getDailyEarnings(currentDay));
    dispatch(getWeeklyEarnings());
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
  
  const arrayDate = [];
  const getDate = weeklyEarnings.map((item) => arrayDate.push(item[0]));

  const arrayTotal = [];
  const getTotal = weeklyEarnings.map((item) => arrayTotal.push(item[1]));

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" count={countOfEmployee} />
          <Widget type="order" count={dailyOrders} />
          <Widget type="earning" count={dailyEarnings.toFixed(2)} />
          <Widget type="products" />
        </div>
        <ColumnChart dates={arrayDate} totals={arrayTotal} />

        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          {/* <Table /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
