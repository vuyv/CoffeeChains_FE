import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import { Box } from "@material-ui/core";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { shadows } from "@mui/system";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { orderDetailsColumns } from "./../../../datatablesource";
import { format } from "date-fns";
import { cancelOrder } from "../../../redux/actions/orderAction";
import { useParams } from "react-router-dom";

const Order = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { branchId } = useParams();
  const { orderId } = useParams();
  const order = useSelector((state) => state.orderReducer.order);
  console.log(order);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(cancelOrder(order.id));
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
        {Object.keys(order).length !== 0 && (
          <>
            <Stack
              style={{ marginTop: 30, marginLeft: 100 }}
              direction="row"
              spacing={2}
            >
              <Box
                sx={{
                  width: 420,
                  padding: 50,
                  border: "1px solid grey",
                  borderRadius: "2px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary="Order ID" />
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary={order.id} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary="Created By" />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary={order.createdBy.name} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary="Created At" />
                  </Grid>
                  <Divider />
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary={formatDate(order.createdAt)} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary="Discount" />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary={formatDiscount(order.discount)} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary="Total Price" />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    md={6}
                    style={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary={order.totalPrice} />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <ListItemText primary="Status" />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <ListItemText primary={order.status} />
                  </Grid>
                </Grid>
              </Box>
              <div style={{ height: 420, width: 420 }}>
                <DataGrid
                   className="datagrid"
                  rows={order.orderDetails}
                  columns={orderDetailsColumns}
                  pageSize={10}
                  rowsPerPageOptions={[1]}
                  getRowId={(row) =>
                    row.orderDetailId.orderId + row.orderDetailId.productId
                  }
                />
              </div>
            </Stack>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClickOpen}
              style={{ marginTop: 30, marginLeft: 800, width: 200 }}
            >
              Cancel
            </Button>
          </>
        )}
        {Object.keys(order).length === 0 && (
          <Alert severity="error">
          <AlertTitle>Not Found</AlertTitle>
        </Alert>
          // <div className="not-found">
          //   <img
          //     src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          //     alt="not-found"
          //     style={{ padding: 150, marginLeft: 150 }}
          //   />
          // </div>
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
