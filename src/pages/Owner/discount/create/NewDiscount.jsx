import React from "react";
import StoreIcon from "@mui/icons-material/Store";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function NewDiscount(props) {
  const [code, setCode] = useState();
  const [percent, setPercent] = useState(0);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [title, setTitle] = useState();

  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  const handleCreateDiscount = () => {};
  return (
    <div>
      <Dialog open={props.openDialog} onClose={handleDialogClose}>
        <DialogTitle>New Promotion</DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            style={{ padding: "30px" }}
          >
            <TextField
              id="outlined-basic"
              label="Discount code"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => setCode(e.target.value)}
            />
            <Button>Generate</Button>
            <TextField
              id="outlined-basic"
              label="Percent"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              onChange={(e) => setPercent(e.target.value)}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="From"
                inputFormat="MM/dd/yyyy"
                value={startTime}
                onChange={(date) => setStartTime(date)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="To"
                inputFormat="MM/dd/yyyy"
                value={endTime}
                onChange={(date) => setEndTime(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleCreateDiscount}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewDiscount;
