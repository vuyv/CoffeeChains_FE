import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { Tabs, Tab } from "@material-ui/core";
import "../../../components/datatable/datatable.scss";
import { orderColumns } from "../../../datatablesource";
import {
  loadOrderInBranch,
  loadOrderById,
  loadOrdersInADayInBranch,
  loadOrdersInAWeekInBranch,
  loadOrdersInAMonthInBranch,
} from "./../../../redux/actions/orderAction";

function ViewOrder() {
  // const orders = useSelector((state) => state.orderReducer.ordersInBranch);
  const ordersInADay = useSelector(
    (state) => state.orderReducer.ordersInADayInBranch
  );
  const ordersInAWeek = useSelector(
    (state) => state.orderReducer.ordersInAWeekInBranch
  );
  const ordersInAMonth = useSelector(
    (state) => state.orderReducer.ordersInAMonthInBranch
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(loadOrderInBranch());
    dispatch(loadOrdersInADayInBranch());
    dispatch(loadOrdersInAWeekInBranch());
    dispatch(loadOrdersInAMonthInBranch());
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
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
                navigate(`/manager/orders/${params.row.id}`);
              }}
            >
              View
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Order Management</div>

          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            style={{ margin: "auto" }}
          >
            {/* <Tab label="all"></Tab> */}
            <Tab label="today"></Tab>
            <Tab label="week"></Tab>
            <Tab label="month"></Tab>
          </Tabs>

          {/* {selectedTab === 0 && (
            <DataGrid
              className="datagrid"
              sx={{ margin: "auto" }}
              rows={orders}
              columns={orderColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.id}
            />
          )} */}
          {selectedTab === 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
