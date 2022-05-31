import React, { useState, useEffect, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../../datatablesource";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployeesInBranch,
  disableEmployeeByManager,
} from "../../../../redux/actions/employeeAction";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./EmployeeTable.scss";

import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../..//navbar/Navbar";

const EmployeeTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);

  const [listEmployees, setListEmployees] = useState([]);
  const [content, setContent] = useState([]);

  const listEmployeesRedux = useSelector((state) => state.employeeReducer);

  useEffect(() => {
    dispatch(loadEmployeesInBranch());
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
    dispatch(disableEmployeeByManager(id));
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
              onClick={() => navigate(`/manager/employees/${params.row.id}`)}
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
            {/* <Link to="/manager/employees/new" className="link">
              Add New
            </Link> */}
            <Button
              variant="outlined"
              onClick={() => navigate("/manager/employees/new")}
            >
              New Employee
            </Button>
          </div>

          <DataGrid
            className="datagrid"
            sx={{ width: " 92%", margin: "auto" }}
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
                  Are you sure you want to disable this employee?
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

export default EmployeeTable;
