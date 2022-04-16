import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/widget/Widget";
import Featured from "../../../components/featured/Featured";
import Chart from "../../../components/chart/Chart";
import BTable from "../../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import {
  getCountOfAllEmployee,
  getAllDailyOrders,
  getAllDailyEarnings,
  getAllProducts,
  getDailyOrdersEachBranch,
  getDailyTotalPriceEachBranch,
} from "../../../redux/actions/ownerStatistics";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { format } from "date-fns";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";

const Home = (props) => {
  const dispatch = useDispatch();
  const currentDay = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    dispatch(getCountOfAllEmployee());
    dispatch(getAllDailyOrders(currentDay));
    dispatch(getAllDailyEarnings(currentDay));
    dispatch(getAllProducts());
    dispatch(getDailyOrdersEachBranch(currentDay));
    dispatch(getDailyTotalPriceEachBranch(currentDay));
  }, []);

  const countOfAllEmployee = useSelector(
    (state) => state.ownerStatisticsReducer.countOfAllEmployee
  );

  const allDailyOrders = useSelector(
    (state) => state.ownerStatisticsReducer.allDailyOrders
  );

  const allDailyEarnings = useSelector(
    (state) => state.ownerStatisticsReducer.allDailyEarnings
  );

  const allProducts = useSelector(
    (state) => state.ownerStatisticsReducer.allProducts
  );

  const dailyOrdersEachBrach = useSelector(
    (state) => state.ownerStatisticsReducer.dailyOrdersEachBrach
  );

  const dailyTotalPriceEachBrach = useSelector(
    (state) => state.ownerStatisticsReducer.dailyTotalPriceEachBrach
  );

  const [open, setOpen] = React.useState(false);

  const callbackFunction = (childData) => {
    setOpen(childData); //true
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" count={countOfAllEmployee} />
          <Widget
            type="order"
            count={allDailyOrders}
            parentCallback={callbackFunction}
          />
          <Widget
            type="earning"
            count={allDailyEarnings.toFixed(2)}
            parentCallback={callbackFunction}
          />
          <Widget type="products" count={allProducts} />
        </div>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              DAILY ORDERS DETAIL
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Table sx={{ minWidth: 340 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Branch</TableCell>
                      <TableCell align="right">Orders</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dailyOrdersEachBrach.map((branch) => (
                      <TableRow
                        key={branch}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {branch[0]}
                        </TableCell>
                        <TableCell align="right">{branch[1]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="charts">
          <Featured />
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
          <div className="listContainer">
            <div className="listTitle">Best seller</div>
            <BTable orders={dailyOrdersEachBrach} total={dailyTotalPriceEachBrach} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
