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
  getEmployeeEachBranch,
  topWeeklySeller1,
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
import HorizontalBarChart from "../../../components/horizontalBarChart/HorizontalBarChart";
const Home = (props) => {
  const dispatch = useDispatch();
  const currentDay = format(new Date(), "yyyy-MM-dd");

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    dispatch(getCountOfAllEmployee());
    dispatch(getEmployeeEachBranch());
    dispatch(getAllDailyOrders(currentDay));
    dispatch(getAllDailyEarnings(currentDay));
    dispatch(getAllProducts());
    dispatch(getDailyOrdersEachBranch(currentDay));
    dispatch(getDailyTotalPriceEachBranch(currentDay));
    dispatch(topWeeklySeller1());
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

  const dailyOrdersEachBranch = useSelector(
    (state) => state.ownerStatisticsReducer.dailyOrdersEachBranch
  );

  const dailyTotalPriceEachBranch = useSelector(
    (state) => state.ownerStatisticsReducer.dailyTotalPriceEachBranch
  );

  const employeeEachBranch = useSelector(
    (state) => state.ownerStatisticsReducer.employeeEachBranch
  );

  const topWeeklySeller = useSelector(
    (state) => state.ownerStatisticsReducer.topWeeklySeller
  );

  const branchs = [];
  const getBranch = topWeeklySeller.map((item) => branchs.push(item[0]));

  const total = [];
  const getTotal = topWeeklySeller.map((item) => total.push(item[1]));

  const [type, setType] = useState();

  const [open, setOpen] = useState(false);

  const callbackFunction = (status, type) => {
    setOpen(status); //true
    setType(type); //employee product/ earning
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(allDailyEarnings);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget
            type="order"
            count={allDailyOrders}
            parentCallback={callbackFunction}
          />
          <Widget
            type="earning"
            count={formatter.format(allDailyEarnings)}
            parentCallback={callbackFunction}
          />
          <Widget
            type="employee"
            count={countOfAllEmployee}
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
            {type === "employee" && (
              <div>
                <DialogTitle id="alert-dialog-title">
                  ALL EMPLOYEES EACH BRANCH
                </DialogTitle>

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Table sx={{ minWidth: 340 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Branch</TableCell>
                          <TableCell align="right">Employees</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employeeEachBranch.map((branch) => (
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
              </div>
            )}
            {type === "order" && (
              <div>
                <DialogTitle id="alert-dialog-title">
                  DAILY ORDERS EACH BRANCH
                </DialogTitle>

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Table sx={{ minWidth: 340 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Branch</TableCell>
                          <TableCell align="right">Orders Quantity</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dailyOrdersEachBranch.map((branch) => (
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
              </div>
            )}
            {type === "earning" && (
              <div>
                <DialogTitle id="alert-dialog-title">
                  DAILY EARNING EACH BRANCH
                </DialogTitle>

                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <Table sx={{ minWidth: 340 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Branch</TableCell>
                          <TableCell align="right">Revenue</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dailyTotalPriceEachBranch.map((branch) => (
                          <TableRow
                            key={branch}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {branch[0]}
                            </TableCell>
                            <TableCell align="right">
                             
                              {formatter.format(branch[1])}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </DialogContentText>
                </DialogContent>
              </div>
            )}
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="charts">
          <Featured />
          <HorizontalBarChart vertical={branchs} horizontal={total} />
        </div>
      </div>
    </div>
  );
};

export default Home;
