import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllDiscounts,
  loadExpiredDiscounts,
  loadHappeningDiscounts,
  loadUpcomingDiscounts,
  deleteDiscount,
} from "../../../../redux/actions/discountAction";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { discountColumns } from "../../../../datatablesource";
import { Tabs, Tab } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewDiscount from "../create/NewDiscount";
function DiscountHome(props) {
  const navigate = useNavigate();
  const upcomingDiscounts = useSelector(
    (state) => state.discountReducer.upcomingDiscounts
  );
  const happeningDiscounts = useSelector(
    (state) => state.discountReducer.happeningDiscounts
  );
  const expiredDiscounts = useSelector(
    (state) => state.discountReducer.expiredDiscounts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllDiscounts());
    dispatch(loadUpcomingDiscounts());
    dispatch(loadHappeningDiscounts());
    dispatch(loadExpiredDiscounts());
  }, []);

  const [value, setValue] = useState(0);
  const [code, setCode] = useState();
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = (code) => {
    setOpen(true);
    setCode(code);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(deleteDiscount(code));
    handleClose();
  };

  const [open, setOpen] = useState(false);

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
                navigate(`/owner/discounts/${params.row.code}`);
              }}
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                handleClickOpen(params.row.code);
              }}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Promotion Management
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDialog(true);
                // navigate("/owner/discounts/new")
              }}
            >
              {/* <AddCircleOutlineIcon /> */}
              New Discount
            </Button>
          </div>

          <Tabs value={selectedTab} onChange={handleChangeTab}>
            <Tab label="upcoming"></Tab>
            <Tab label="happening"></Tab>
            <Tab label="expired"></Tab>
          </Tabs>

          {selectedTab === 0 && (
            <DataGrid
              className="datagrid"
              rows={upcomingDiscounts}
              columns={discountColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.code}
            />
          )}
          {selectedTab === 1 && (
            <DataGrid
              className="datagrid"
              rows={happeningDiscounts}
              columns={discountColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.code}
            />
          )}
          {selectedTab === 2 && (
            <DataGrid
              className="datagrid"
              rows={expiredDiscounts}
              columns={discountColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.code}
            />
          )}

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
                Are you sure you want to disable this discount?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleAgree}>Agree</Button>
            </DialogActions>
          </Dialog>

          <NewDiscount openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </div>
      </div>
    </div>
  );
}

export default DiscountHome;
