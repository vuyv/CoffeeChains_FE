import "./TableEmployee.scss";
// import "./datatable.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { loadBranchs } from "./../../../../redux/actions/branchAction";
import { loadRoles } from "./../../../../redux/actions/roleAction";
import { Stack } from "@mui/material";

const TableEmployee = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [listEmployees, setListEmployees] = useState();
  const [content, setContent] = useState();
  const [branch, setBranch] = useState("All");
  const [status, setStatus] = useState("All");
  const [role, setRole] = useState("All");

  const listEmployeesRedux = useSelector((state) => state.employeeReducer);
  const branches = useSelector((state) => state.branchReducer.branchs);

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

  useEffect(() => {
    dispatch(loadEmployees());
    dispatch(loadBranchs());
    dispatch(loadRoles());
  }, []);

  useEffect(() => {
    setListEmployees(listEmployeesRedux.employees);
  }, [content]);

  useEffect(() => {
    if (listEmployeesRedux) {
      let result = [];
      listEmployeesRedux.employees.forEach((emp) => {
        result.push(emp);
      });
      setContent(result);
    }
  }, [listEmployeesRedux, setContent]);

  const handleSearchEmployee = (searchValue) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      const filteredRows = content.filter((row) => {
        return row.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setListEmployees(filteredRows);
    }, 300);
  };

  const filterStatus = (array) => {
    if (status === "All") {
      return array;
    } else {
      return array.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
    }
  };

  const filterBranch = (array) => {
    if (branch === "All") {
      return array;
    } else {
      return array.filter((item) => item.branch.name === branch);
    }
  };

  const filterRole = (array) => {
    if (role === "All") {
      return array;
    } else {
      return array.filter(
        (item) => item.role.name.toLowerCase() === role.toLowerCase()
      );
    }
  };

  useEffect(() => {
    let result = listEmployeesRedux.employees;
    window.setTimeout(() => {
      result = filterBranch(result);
      result = filterStatus(result);
      result = filterRole(result);
      setListEmployees(result);
    }, 100);
  }, [branch, status, role]);

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
            <Button
              variant="outlined"
              onClick={() => navigate("/owner/employees/new")}
            >
              New Employee
            </Button>
          </div>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            m={2}
          >
            <Box sx={{ width: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={branch}
                  label="branch"
                  onChange={(event) => setBranch(event.target.value)}
                  size="small"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {branches.map((branch) => (
                    <MenuItem value={branch.name}>{branch.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="status"
                  onChange={(event) => setStatus(event.target.value)}
                  size="small"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Inactive"}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="role"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  size="small"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Seller"}>Seller</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
          <DataGrid
            className="datagrid"
            rows={listEmployees}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            sx={{ width: "92%", margin: "auto" }}
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
