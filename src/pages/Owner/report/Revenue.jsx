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
import TablePagination from "@mui/material/TablePagination";

const Revenue = ({ timeRange, reportType, date }) => {
  const [data, setData] = useState([]);
  const reducer = useSelector((state) => state.ownerReportReducer);
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    setData(reducer.reportByTime);
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

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <div className="listContainer" style={{ padding: 30 }}>
        <h4 style={{ textTransform: "uppercase", textAlign: "center" }}>
          {timeRange} Revenue Report
        </h4>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          marginTop={2}
          marginBottom={2}
        >
          <Stack direction="column">
            <h6>
              <b>Date:</b> <i>{format(date, "MM/dd/yyyy")}</i>
            </h6>
          </Stack>
        </Stack>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table" pagin>
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">No.</TableCell>
                <TableCell className="tableCell">Branch Name</TableCell>
                <TableCell className="tableCell">Address</TableCell>
                <TableCell className="tableCell" align="right">
                  Orders Quantity
                </TableCell>
                <TableCell className="tableCell" align="right">
                  Revenue
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 && (
                <TableCell className="tableCell">No rows data</TableCell>
              )}
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index + 1 + page * rowsPerPage}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell className="tableCell">
                      {index + 1 + page * rowsPerPage}
                    </TableCell>
                    <TableCell className="tableCell">{row[0]}</TableCell>
                    <TableCell className="tableCell">{row[1]}</TableCell>
                    <TableCell className="tableCell" align="right">
                      {row[2]}
                    </TableCell>
                    <TableCell className="tableCell" align="right">
                      {formatter.format(row[3])}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
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
export default Revenue;
