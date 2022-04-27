import "./table.scss";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";

const BTable = (props) => {
  const { filter, clicked, data } = props;
  // const dailyRevenueAllBranch = useSelector(
  //   (state) => state.ownerReportReducer.dailyRevenueAllBranch
  // );

  // const weeklyRevenueAllBranch = useSelector(
  //   (state) => state.ownerReportReducer.weeklyRevenueAllBranch
  // );

  // const monthlyRevenueAllBranch = useSelector(
  //   (state) => state.ownerReportReducer.monthlyRevenueAllBranch
  // );

  // const dailyProductAllCategory = useSelector(
  //   (state) => state.ownerReportReducer.dailyProductAllCategory
  // );

  // const weeklyProductAllCategory = useSelector(
  //   (state) => state.ownerReportReducer.weeklyProductAllCategory
  // );

  // const monthlyProductAllCategory = useSelector(
  //   (state) => state.ownerReportReducer.monthlyProductAllCategory
  // );

  const [tableHead, setTableHead] = useState([]);
  const [tableBody, setTableBody] = useState([]);

  const revenueHead = ["No.", "Branch", "Address", "Order Quantity", "Revenue"];
  // useEffect(() => {
  //   switch (filter) {
  //     case "dailyRevenueAllBranch":
  //       setTableHead(revenueHead);
  //       setTableBody(dailyRevenueAllBranch);
  //       break;
  //     case "weeklyRevenueAllBranch":
  //       setTableHead(revenueHead);
  //       setTableBody(weeklyRevenueAllBranch);
  //       break;
  //     case "monthlyRevenueAllBranch":
  //       setTableHead(revenueHead);
  //       setTableBody(monthlyRevenueAllBranch);
  //       break;
  //     case "dailyProductAllCategory":
  //       setTableHead(revenueHead);
  //       setTableBody(dailyProductAllCategory);
  //       break;
  //     case "weeklyProductAllCategory":
  //       setTableHead(revenueHead);
  //       setTableBody(weeklyProductAllCategory);
  //       break;
  //     case "monthlyProductAllCategory":
  //       setTableHead(revenueHead);
  //       setTableBody(monthlyProductAllCategory);
  //       break;
  //   }
  // }, [props]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHead.map((item) => (
              <TableCell className="tableCell">{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="tableCell">{index + 1}</TableCell>
              <TableCell className="tableCell">{row[0]}</TableCell>
              <TableCell className="tableCell">{row[1]}</TableCell>
              <TableCell className="tableCell">{row[2]}</TableCell>
              {/* <TableCell className="tableCell">$ {row[3].toFixed(2)}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BTable;
