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

const Product = ({ filter }) => {
  const [data, setData] = useState([]);
  const reducer = useSelector((state) => state.ownerReportReducer);

  useEffect(() => {
    setData(reducer.reportByTime);
  }, [reducer, setData]);

  return (
    <div className="listContainer">
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
            {data.length === 0 && (
              <TableCell className="tableCell">No rows data</TableCell>
            )}
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="tableCell">{index + 1}</TableCell>
                <TableCell className="tableCell">{row[0]}</TableCell>
                <TableCell className="tableCell">{row[1]}</TableCell>
                <TableCell className="tableCell">
                  $ {row[2].toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Product;
