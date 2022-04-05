// import "./TableEmployee.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../../datatablesource";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  loadProducts,
  loadProductById,
  disableProduct,
} from "../../../../redux/actions/productAction";
const TableProduct = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => state.productReducer.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
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

  const handleAgree = () => {
    dispatch(disableProduct(id));
    handleClose();
  };

  const product = useSelector((state) => state.productReducer.product);

  const handleViewDetail = (id) => {
    dispatch(loadProductById(id));
    console.log(product);
    // navigate(`/owner/products/${id}`, { state: product });
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
                // handleViewDetail(params.row.id);
                navigate(`/owner/products/${params.row.id}`);
              }}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                handleClickOpen(params.row.id);
              }}
            >
              Disable
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
          <div className="datatableTitle">
            Product Manage
            <Link to="/owner/products/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={products}
            columns={productColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm disable?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to disable this element?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleAgree}>Agree</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableProduct;
