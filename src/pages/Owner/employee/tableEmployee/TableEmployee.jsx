import "./TableEmployee.scss";
// import "./datatable.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import DataTable from "../../../../components/datatable/DataTable";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { userColumns } from "../../../../datatablesource";
import {
  loadEmployees,
  disableEmployees,
} from "../../../../redux/actions/employeeAction";

import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TableEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [listEmployees, setListEmployees] = useState([]);
  const [content, setContent] = useState([]);

  const listEmployeesRedux = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(loadEmployees());
  }, []);

  useEffect(() => {
    if (listEmployeesRedux) {
      let result = [];
      listEmployeesRedux.employees.forEach((emp) => {
        result.push(emp);
      });
      setContent(result);
      setListEmployees(result);
    }
  }, [listEmployeesRedux, setContent, setListEmployees]);

  const handleSearchEmployee = (searchValue) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setListEmployees(
        content.filter((employee) =>
          employee.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }, 300);
  };

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(disableEmployees(id));
    handleClose();
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
              onClick={() => navigate(`/owner/employees/${params.row.id}`)}
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
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar search={handleSearchEmployee} />
        <div className="datatable">
          <div className="datatableTitle">
            Employee Management
            <Link to="/owner/employees/new" className="link">
              Add New
            </Link>
          </div>
          <DataGrid
            className="datagrid"
            rows={listEmployees}
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
      </div>
    </div>
  );
};

export default TableEmployee;
