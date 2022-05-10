import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useParams } from "react-router-dom";
import { orderDetailsColumns } from "./../../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";

function OrderDetail() {
  const { orderId } = useParams();

  const order = useSelector((state) =>
    state.orderReducer.ordersInAMonthInBranch.find((order) => {
      return order.id == orderId;
    })
  );

  console.log(order);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Order Detail</div>
          <div className="container" style={{ width: 450, height: "100%" }}>
            <DataGrid
              className="datagrid"
              rows={order.orderDetails}
              columns={orderDetailsColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) =>
                row.orderDetailId.orderId + row.orderDetailId.productId
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderDetail;
