import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import { Box } from "@material-ui/core";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { orderDetailsColumns } from "./../../../datatablesource";
import { format } from "date-fns";
import { cancelOrder } from "../../../redux/actions/orderAction";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { textTransform } from "@mui/system";
import { useReactToPrint } from "react-to-print";

const Bill = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const order = useSelector((state) => state.orderReducer.order);
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const afterFormat = format(date, "dd/MM/yyyy");
    return afterFormat;
  };

  const formatDiscount = (discount) => {
    var percent = "None";
    if (discount !== null) {
      percent = discount.percent + "%";
    }
    return percent;
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        {Object.keys(order).length !== 0 && (
          <div>
            <TableContainer
              ref={componentRef}
              component={Paper}
              sx={{
                width: 500,
                margin: "auto",
                marginTop: 10,
                fontSize: "1rem",
              }}
            >
              <Table sx={{ marginTop: 3 }}>
                <h5
                  style={{
                    position: "absolute",
                    "justify-content": "center",
                    marginLeft: 200,
                    marginBottom: 100
                  }}
                >
                  RECEIPT
                </h5>
                <TableRow
                  xs={{
                    "&:last-child td, &:last-child th": { border: "none", paddingTop: 30 },
                  }}
                >
                  <TableCell align="center" colSpan={2}>
                    {/* Branch */}
                    {currentUser.branch.name}
                  </TableCell>
                  <TableCell align="center">
                    {currentUser.branch.address}
                  </TableCell>
                </TableRow>

                <TableRow
                  xs={{
                    "&:last-child td, &:last-child th": { border: "none" },
                  }}
                >
                  <TableCell align="center" colSpan={2}>
                    No.
                  </TableCell>
                  <TableCell align="center">
                    {order.id.substr(order.id.length - 3)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Date
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(order.createdAt)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Employee
                  </TableCell>
                  <TableCell align="center">{order.createdBy.name}</TableCell>
                </TableRow>
              </Table>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5eee8 !important" }}>
                    <TableCell align="center" colSpan={2}>
                      Product
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      Quantity
                    </TableCell>
                    <TableCell align="center" colSpan={2}>
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.orderDetails.map((orderDetail) => (
                    <TableRow
                      key={orderDetail.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center" colSpan={2}>
                        {orderDetail.product.name}
                      </TableCell>
                      <TableCell align="center" colSpan={2}>
                        {orderDetail.quantity}
                      </TableCell>
                      <TableCell
                        align="right"
                        colSpan={2}
                        sx={{ paddingRight: 10 }}
                      >
                        ${orderDetail.product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Discount
                    </TableCell>
                    <TableCell
                      align="right"
                      colSpan={4}
                      sx={{ paddingRight: 10 }}
                    >
                      {formatDiscount(order.discount)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Total Price
                    </TableCell>
                    <TableCell
                      align="right"
                      colSpan={4}
                      sx={{ paddingRight: 10 }}
                    >
                      ${order.totalPrice}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer
              component={Paper}
              sx={{
                width: 500,
                margin: "auto",
                // marginTop: 10,
                fontSize: "1rem",
              }}
            >
              <Button
                variant="outlined"
                onClick={handlePrint}
                style={{ margin: 20, marginLeft: 350, width: 100 }}
              >
                Print
              </Button>
            </TableContainer>
          </div>
        )}
        {Object.keys(order).length === 0 ||
          (order === null && (
            <Alert severity="error">
              <AlertTitle>Not Found</AlertTitle>
            </Alert>
          ))}
      </div>
    </div>
  );
};

export default Bill;
