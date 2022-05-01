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
import { setDate } from "date-fns/esm";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";

const Product = ({ timeRange, reportType, date }) => {
  const [data, setData] = useState([]);
  const reducer = useSelector((state) => state.managerReportReducer);
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    setData(reducer.reportEachBranch);
    timeReport();
  }, [reducer, setData]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const timeReport = () => {
    if (timeRange === "Daily") {
      document.getElementById("timeReport").innerHTML =
        "Date: " + format(date, "dd/MM/yyyy");
    }
  };

  return (
    // <div className="listContainer">
    <>
      <div className="listContainer" style={{ padding: 30 }}>
        <h4 style={{ textTransform: "uppercase", textAlign: "center" }}>
          {timeRange} Revenue Report Per {reportType}
        </h4>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          marginTop={2}
          marginBottom={2}
        >
          <Stack direction="column">
            <h6>Branch: {currentUser.branch.name}</h6>
            <h6>Address: {currentUser.branch.address}</h6>
          </Stack>
          <Stack direction="column">
            <h6>Date of Report: {format(new Date(), "dd/MM/yyyy")}</h6>
            <h6 id="timeReport"></h6>
          </Stack>
        </Stack>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" pagin>
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">No.</TableCell>
                <TableCell className="tableCell">Name</TableCell>
                <TableCell className="tableCell">Quantity</TableCell>
                <TableCell className="tableCell">Revenue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 && (
                <TableCell className="tableCell">No rows data</TableCell>
              )}
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index + 1 + page * rowsPerPage}>
                    <TableCell className="tableCell">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="tableCell">{row[0]}</TableCell>
                    <TableCell className="tableCell">{row[1]}</TableCell>
                    <TableCell className="tableCell">
                      ${row[2].toFixed(2)}
                    </TableCell>
                    {console.log(page)}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={5}
          component="div"
          count={data.length}
          rowsPerPage={5}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};
export default Product;
