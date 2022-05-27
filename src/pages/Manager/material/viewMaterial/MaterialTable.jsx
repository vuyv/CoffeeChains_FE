import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { materialColumns } from "../../../../datatablesource";
import Material from "../createMaterial/Material";
import { useSelector, useDispatch } from "react-redux";
import { addMaterials } from './../../../../redux/actions/materialAction';

const MaterialTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
   const materialList = useSelector((state) => state.materialReducer);

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
    handleClose();
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              // onClick={() => navigate(`/manager/employees/${params.row.id}`)}
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
          <div className="datatableTitle">
            Material Management
            <Button
              variant="outlined"
              onClick={() => navigate("/manager/materials/new")}
             
            >
              Add Material
            </Button>
          </div>

        
          <DataGrid
            className="datagrid"
            sx={{ width: " 77%", margin: "auto" }}
            rows={materialList.materials}
            columns={materialColumns.concat(actionColumn)}
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

export default MaterialTable;
