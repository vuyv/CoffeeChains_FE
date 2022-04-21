import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import BTable from "../../../components/table/Table";
import Grid from "@mui/material/Grid";
import { loadBranchs } from "../../../redux/actions/branchAction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function Report(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBranchs());
  }, []);

  const categories = useSelector((state) => state.categoryReducer.categories);

  const [branch, setBranch] = useState();
  const branches = useSelector((state) => state.branchReducer.branchs);

  useEffect(() => {
    branches.unshift({ id: 0, name: "All" });
  }, [branches]);

  const [type, setType] = useState();

  //datepicker
  const [value, setValue] = React.useState(null);

  //select
  const [timeRange, setTimeRange] = useState("");
  const [reportType, setReportType] = useState();

  const handleChangeTimeRange = (event) => {
    setTimeRange(event.target.value);
  };
  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const [measure, setMeasure] = useState();
  const handleChangeMeasure = (e) => {
    setMeasure(e.target.value);
  };

  const handleApply = () => {
    console.log("hi");
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Report</div>
          <div>
            <Grid container spacing={2} style={{ margin: "auto" }}>
              <Grid item xs={2}>
                <div>
                  <Box sx={{ minWidth: 130 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" size="small">
                        Report Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reportType}
                        label="Report Type"
                        onChange={handleChangeReportType}
                        size="small"
                      >
                        <MenuItem value={0}>Product</MenuItem>
                        <MenuItem value={1}>Employee</MenuItem>
                        <MenuItem value={2}>Revenue</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>
              {reportType === 2 && (
                <Grid item xs={2}>
                  <div>
                    <Box sx={{ minWidth: 130 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" size="small">
                          Measure
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={measure}
                          label="Measure"
                          onChange={handleChangeMeasure}
                          size="small"
                        >
                          {branches.map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </Grid>
              )}
              <Grid item xs={2}>
                <div>
                  <Box sx={{ minWidth: 130 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label" size="small">
                        Time Range
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={timeRange}
                        label="Time Range"
                        onChange={handleChangeTimeRange}
                        size="small"
                      >
                        <MenuItem value={0}>Daily</MenuItem>
                        <MenuItem value={1}>Weekly</MenuItem>
                        <MenuItem value={2}>Monthly</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" onClick={handleApply}>Aplly</Button>
              </Grid>
              {/* <Grid item xs={2}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Basic example"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </Grid> */}
            </Grid>
            <div className="listContainer">
              <BTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
