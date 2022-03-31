import "./branch.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import CardBranch from "../../components/cardBranch/CardBranch";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBranchs } from "../../redux/actions/branchAction";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { createBranch } from "../../redux/actions/branchAction";

const Branch = () => {
  const branchFromRedux = useSelector((state) => state.branchReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBranchs());
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [branchName, setBranchName] = useState();
  const [branchAddress, setBranchAddress] = useState();

  const handleCreate = () => {
    dispatch(createBranch(branchName, branchAddress));
    handleClose();
    dispatch(loadBranchs());
  };
  return (
    <div className="branch">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Branch Manage
            <button className="link" onClick={handleClickOpen}>
              Add New
            </button>
          </div>
          <div className="widgets">
            {branchFromRedux.branchs.map((item, index) => (
              <CardBranch key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Branch</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Branch name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => setBranchName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="address"
            fullWidth
            variant="standard"
            onChange={(e) => setBranchAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Branch;
