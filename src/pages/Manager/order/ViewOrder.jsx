import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Tabs, Tab } from "@material-ui/core";
import "../../../components/datatable/datatable.scss";
import { orderColumns, orderDetailsColumns } from "../../../datatablesource";
import {
  loadOrderById,
  loadOrdersInADayInBranch,
  loadOrdersInAWeekInBranch,
  loadOrdersInAMonthInBranch,
} from "./../../../redux/actions/orderAction";
import { format } from "date-fns";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function ViewOrder() {
  const currentDay = format(new Date(), "yyyy-MM-dd");
  const typingTimeOutRef = useRef(null);
  const [content, setContent] = useState([]);

  const dispatch = useDispatch();

  const ordersInADay = useSelector(
    (state) => state.orderReducer.ordersInADayInBranch
  );
  useEffect(() => {
    dispatch(loadOrdersInADayInBranch(currentDay));
    dispatch(loadOrdersInAWeekInBranch(currentDay));
    dispatch(loadOrdersInAMonthInBranch(currentDay));
  }, []);

  useEffect(() => {
    setListOrders(ordersInADay);
  }, [ordersInADay]);

  
  const ordersInAWeek = useSelector(
    (state) => state.orderReducer.ordersInAWeekInBranch
  );
  const ordersInAMonth = useSelector(
    (state) => state.orderReducer.ordersInAMonthInBranch
  );

  const order = useSelector((state) => state.orderReducer.order);

  const mapToArray = (arr) => {
    let result = [];
    arr.forEach((item) => {
      result.push(item);
    });
    return result;
  };

  const [listOrders, setListOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setListOrders(mapToArray(ordersInADay));
      setContent(mapToArray(ordersInADay));
    }
    if (newValue === 1) {
      setListOrders(mapToArray(ordersInAWeek));
      setContent(mapToArray(ordersInAWeek));
    }
    if (newValue === 2) {
      setListOrders(mapToArray(ordersInAMonth));
      setContent(mapToArray(ordersInAMonth));
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                // navigate(`/manager/orders/${params.row.id}`);
                dispatch(loadOrderById(params.row.id));
                handleClickOpen();
              }}
            >
              View
            </div>
          </div>
        );
      },
    },
  ];

  // const handleSearchOrder = (searchValue) => {
  //   setListOrders(ordersInAMonth.filter((order) => order.id.includes(searchValue)));
  // };

  const handleSearchOrder = (searchValue) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setListOrders(
        content.filter((order) =>
          order.id.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }, 300);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar search={handleSearchOrder} />
          <div className="datatable">
            <div className="datatableTitle">Order Management</div>

            <Tabs
              value={selectedTab}
              onChange={handleChangeTab}
              style={{ margin: "auto" }}
            >
              <Tab label="today"></Tab>
              <Tab label="week"></Tab>
              <Tab label="month"></Tab>
            </Tabs>
            <DataGrid
              className="datagrid"
              rows={listOrders}
              columns={orderColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.id}
            />
            {/* {selectedTab === 0 && (
              <DataGrid
                className="datagrid"
                rows={ordersInADay}
                columns={orderColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                getRowId={(row) => row.id}
              />
            )}
            {selectedTab === 1 && (
              <DataGrid
                className="datagrid"
                rows={ordersInAWeek}
                columns={orderColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                getRowId={(row) => row.id}
              />
            )}
            {selectedTab === 2 && (
              <DataGrid
                className="datagrid"
                rows={ordersInAMonth}
                columns={orderColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                getRowId={(row) => row.id}
              />
            )} */}
          </div>
        </div>
      </div>
      {Object.keys(order).length != 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          maxWidth="md"
        >
          <DialogTitle id="alert-dialog-title">
            {"Order ID: "} {order.id}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Base Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderDetails.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.product.name}
                        </TableCell>
                        <TableCell align="right">
                          {formatter.format(row.product.price)}
                        </TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          {formatter.format(row.product.price * row.quantity)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell rowSpan={3} />
                      <TableCell colSpan={2}>
                        <b>Discount</b>
                      </TableCell>
                      <TableCell align="right">
                        {formatter.format(order.discount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Total</b>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        {formatter.format(order.totalPrice)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default ViewOrder;
