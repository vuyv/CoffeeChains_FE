import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../../../components/table/table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";

const ExportProduct = ({ timeRange, reportType, date }) => {
  const [data, setData] = useState([]);
  const reducer = useSelector((state) => state.managerReportReducer);
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    setData(reducer.reportEachBranch);
  }, [reducer, setData]);

  return (
    <div className="listContainer" style={{ padding: 30 }}>
      <h4 style={{ textTransform: "uppercase", textAlign: "center" }}>
        {timeRange} Revenue Report Per {reportType}
      </h4>
      <Stack
        direction="row"
        // justifyContent="space-evenly"
        marginTop={2}
        marginBottom={2}
      >
        <Stack direction="column">
          <h6>Branch: {currentUser.branch.name}</h6>
          <h6>Address: {currentUser.branch.address}</h6>
        </Stack>
        <Stack
          direction="column"
          // justifyContent="flex-end"
          // alignItems="flex-end"
        >
          <h6 style={{ textAlign: "right" }}>
            Date of Report: {format(new Date(), "dd/MM/yyyy")}
          </h6>
          <h6 id="timeReport" style={{ textAlign: "right" }}></h6>
        </Stack>
      </Stack>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">No.</TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Quantity</TableCell>
              <TableCell className="tableCell">Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index + 1}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row[0]}</TableCell>
                <TableCell className="tableCell">{row[1]}</TableCell>
                <TableCell className="tableCell">{row[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default ExportProduct;
