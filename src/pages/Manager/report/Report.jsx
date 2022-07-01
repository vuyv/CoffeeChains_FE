import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../../components/table/table.scss";

import Employee from "./Employee";
import { loadCategories } from "./../../../redux/actions/categoryAction";
import Product from "./Product";
import { getReportEachBranch } from "./../../../redux/actions/managerReportAction";
import { format } from "date-fns";
import { useRef, forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Report = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  // const ref = createRef();
  const navigate = useNavigate();
  const [timeRangeSendViaButton, setTimeRangeSendViaButton] = useState("");
  const [timeSelectedSendViaButton, setTimeSelectedSendViaButton] = useState(
    new Date()
  );
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  const categories = useSelector((state) => state.categoryReducer.categories);

  //datepicker
  const [date, setDate] = React.useState(new Date());
  const [timeRange, setTimeRange] = useState("Daily");
  const [reportType, setReportType] = useState("Employee");
  const [category, setCategory] = useState(0);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(
      getReportEachBranch(
        reportType,
        currentUser.branch.id,
        category,
        timeRange,
        format(date, "yyyy-MM-dd")
      )
    );
  }, []);

  // useEffect(() => {
  //   categories.unshift({ id: 0, name: "All" });
  //   setCategory(categories[0].id);
  // }, [categories]);

  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const handleChangeTimeRange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleApply = () => {
    setTimeRangeSendViaButton(timeRange);
    setTimeSelectedSendViaButton(date);
    dispatch(
      getReportEachBranch(
        reportType,
        currentUser.branch.id,
        category,
        timeRange,
        format(date, "yyyy-MM-dd")
      )
    );
  };

  const handleExport = () => {
    window.open(
      `${
        process.env.REACT_APP_HOST
      }/report/manager/export/?exportType=PDF&type=${reportType}&branchId=${
        currentUser.branch.id
      }&categoryId=${category}&date=${format(
        date,
        "yyyy-MM-dd"
      )}&timeRange=${timeRange}`
    );
  };

  const handlePrint = () => {
    let url = `${
      process.env.REACT_APP_HOST
    }/report/manager/export/?exportType=HTML&type=${reportType}&branchId=${
      currentUser.branch.id
    }&categoryId=${category}&date=${format(
      date,
      "yyyy-MM-dd"
    )}&timeRange=${timeRange}`;
    window.open(url);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Report</div>
          <div>
            <Grid container spacing={2}>
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
                        <MenuItem value={"Employee"}>Employee</MenuItem>
                        <MenuItem value={"Product"}>Product</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>

              {reportType === "Product" && (
                <Grid item xs={2}>
                  <div>
                    <Box sx={{ minWidth: 130 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" size="small">
                          Category
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={category}
                          label="Category"
                          onChange={handleChangeCategory}
                          size="small"
                        >
                          <MenuItem value={0}>All</MenuItem>
                          {categories.map((item) => (
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
                        <MenuItem value={"Daily"}>Daily</MenuItem>
                        <MenuItem value={"Weekly"}>Weekly</MenuItem>
                        <MenuItem value={"Monthly"}>Monthly</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>

              <Grid item xs={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Basic example"
                    value={date}
                    onChange={(newDate) => {
                      setDate(newDate);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item style={{ marginTop: 2 }}>
                <Button
                  style={{
                    color: "white",
                    background: "#1976d2",
                    fontFamily: "Roboto",
                    fontWeight: "500",
                    fontSize: "0.875rem",
                    lineHeight: "1.75",
                    letterSpacing: "0.02857em",
                    textTransform: "uppercase",
                    minWidth: "64px",
                    padding: "6px 8px",
                    borderRadius: "4px",
                  }}
                  onClick={handleApply}
                >
                  Apply
                </Button>
              </Grid>
            </Grid>
            <div
              style={{
                width: 800,
                marginLeft: 230,
              }}
            >
              {reportType === "Product" && (
                <Product
                  timeRange={timeRangeSendViaButton}
                  reportType={reportType}
                  date={timeSelectedSendViaButton}
                />
              )}

              {reportType === "Employee" && (
                <Employee
                  timeRange={timeRangeSendViaButton}
                  reportType={reportType}
                  date={timeSelectedSendViaButton}
                />
              )}
            </div>

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent="flex-end"
              alignItems="flex-end"
              marginRight={40}
            >
              <Button
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                  border: "1px solid",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  lineHeight: "1.75",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                  minWidth: "64px",
                  padding: "6px 8px",
                  borderRadius: "4px",
                }}
                onClick={handleExport}
              >
                Export
              </Button>

              <Button
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                  border: "1px solid",
                  fontFamily: "Roboto",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  lineHeight: "1.75",
                  letterSpacing: "0.02857em",
                  textTransform: "uppercase",
                  minWidth: "64px",
                  padding: "6px 8px",
                  borderRadius: "4px",
                }}
                onClick={handlePrint}
              >
                Print
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
