import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import orderReducer from "./../../../redux/reducer/orderReducer";
import { orderColumns } from "../../../datatablesource";
import { loadOrderInBranch, loadOrderById } from "./../../../redux/actions/orderAction";

function ViewOrder() {
  const orders = useSelector((state) => state.orderReducer.ordersInBranch);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadOrderInBranch());
  }, []);

  const [open, setOpen] = useState(false);

  const [id, setId] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
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
            {/* <div
              className="deleteButton"
              onClick={() => {
                handleClickOpen(params.row.id);
              }}
            >
              Cancel
            </div> */}
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
          <DataGrid
            className="datagrid"
            rows={orders}
            columns={orderColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            getRowId={(row) => row.id}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
