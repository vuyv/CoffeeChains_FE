import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";


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

const Order = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { branchId } = useParams();
  const { value } = useParams();

  const searchOrder = useSelector((state) => state.orderReducer.searchOrder);
  const currentUser = useSelector((state) => state.employeeReducer.currentUser);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    copyStyles: true,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(cancelOrder(searchOrder.id));
    handleClose();
  };

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const afterFormat = format(date, "yyyy-MM-dd");
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

        {Object.keys(searchOrder).length !== 0 ? (
          <div>
            <TableContainer
              ref={componentRef}
              component={Paper}
              sx={{
                width: 500,
                margin: "auto",
                marginTop: 2,
                fontSize: "1rem",
              }}
            >
              <Table sx={{ marginTop: 3 }}>
                <TableRow
                  xs={{
                    "&:last-child td, &:last-child th": { border: "none" },
                  }}
                >
                  <TableCell align="center" colSpan={2}>
                    No
                  </TableCell>
                  <TableCell align="center">{searchOrder.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Employee
                  </TableCell>
                  <TableCell align="center">
                    {searchOrder.createdBy.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Date
                  </TableCell>
                  <TableCell align="center">
                    {formatDate(searchOrder.createdAt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Status
                  </TableCell>
                  <TableCell align="center">{searchOrder.status}</TableCell>
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
                  {searchOrder.orderDetails.map((orderDetail) => (
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
                      <TableCell align="center" colSpan={2}>
                        ${orderDetail.product.price}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Discount
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                      {formatDiscount(searchOrder.discount)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" colSpan={4}>
                      Total Price
                    </TableCell>
                    <TableCell align="center" colSpan={4}>
                      ${searchOrder.totalPrice}
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
                style={{ margin: 20, marginLeft: 150, width: 100 }}
              >
                Print
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClickOpen}
                style={{ margin: 10, marginLeft: 50, width: 150 }}
              >
                Cancel Order
              </Button>
            </TableContainer>
          </div>
        ) : (
          <Alert severity="error" style={{ margin: "10px" }}>
            <AlertTitle style={{ textAlign: "center" }}>
              Order not found!
            </AlertTitle>
          </Alert>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to cancel order?"}
        </DialogTitle>
        <DialogActions
          sx={{
            width: 300,
            height: 100,
          }}
        >
          <Button onClick={handleClose} autoFocus>
            Disagree
          </Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Order;
