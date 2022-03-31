import "./datatable.scss";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployees,
  disableEmployees,
} from "../../redux/actions/employeeAction";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Datatable = () => {
  const navigate = useNavigate();
  const { employees } = useSelector((state) => state.employeeReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

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
    dispatch(disableEmployees(id));
    dispatch(loadEmployees());
    handleClose();
  };

  const [status, setStatus] = useState(true);
  const onChangeStatus = () => {
    setStatus(!status);
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
              onClick={() => navigate(`/employees/${params.row.id}`)}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleClickOpen(params.row.id)}
            >
              Disable
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Employee Manage
        <Link to="/employees/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={employees}
        columns={userColumns.concat(actionColumn)}
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
  );
};

export default Datatable;
