import "./CardBranch.scss";
import StoreIcon from "@mui/icons-material/Store";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { updateBranch } from "../../redux/actions/branchAction";
import { useNavigate } from "react-router-dom";

const CardBranch = (props) => {
  const { item } = props;
  const [backgroundColor, setBackgroundColor] = useState();
  const [logoColor, setLogoColor] = useState();
  const [name, setName] = useState(item.name);
  const [address, setAddress] = useState(item.address);
  const [statusSwitch, setStatusSwitch] = useState();
  const [branchStatus, setBranchStatus] = useState(item.status);

  useEffect(() => {
    if (branchStatus === "INACTIVE") {
      setBackgroundColor("rgba(255, 0, 0, 0.2)");
      setLogoColor("crimson");
      setStatusSwitch(false);
    } else {
      setBackgroundColor("rgba(0, 128, 0, 0.2)");
      setLogoColor("green");
      setStatusSwitch(true);
    }
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.setTimeout(() => {
      setOpen(false);
    }, 20);
  };

  const handleChangeStatus = () => {
    if (branchStatus === "INACTIVE") setBranchStatus("ACTIVE");
    if (branchStatus === "ACTIVE") setBranchStatus("INACTIVE");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = () => {
    dispatch(updateBranch(name, address, branchStatus, item.id));
    handleClose();
    // navigate("/");
  };
  return (
    <div className="widget col-3" onClick={handleClickOpen}>
      <div className="left">
        <span className="title">BRANCH</span>
        <span className="counter">{item.name}</span>
        <span className="link">{item.address}</span>
      </div>
      <div className="right">
        <StoreIcon
          className="icon"
          style={{
            fontSize: "28px",
            color: logoColor,
            backgroundColor: backgroundColor,
          }}
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {item.name}{" "}
          <FormControlLabel
            style={{ marginLeft: "120px" }}
            label="Status"
            control={
              <Switch
                checked={statusSwitch}
                onChange={() => handleChangeStatus()}
              />
            }
          />
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Branch name"
            type="name"
            value={name}
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            value={address}
            type="address"
            fullWidth
            variant="standard"
            onChange={(e) => setAddress(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardBranch;
