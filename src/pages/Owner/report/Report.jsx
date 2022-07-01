import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import BTable from "../../../components/table/Table";
import Grid from "@mui/material/Grid";
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
import { format } from "date-fns";

import { getReportByTime } from "../../../redux/actions/ownerReport";
import { loadCategories } from "../../../redux/actions/categoryAction";
import Product from "./Product";
import Revenue from "./Revenue";
import Stack from "@mui/material/Stack";
function Report(props) {
  const dispatch = useDispatch();
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const [timeRangeSendViaButton, setTimeRangeSendViaButton] = useState("");
  const [timeSelectedSendViaButton, setTimeSelectedSendViaButton] = useState(new Date());

  const categories = useSelector((state) => state.categoryReducer.categories);

  //datepicker
  const [timeSelected, setTimeSelected] = useState(new Date());

  //select
  const [timeRange, setTimeRange] = useState("Daily");
  const [filter, setFilter] = useState("");

  const handleChangeTimeRange = (event) => {
    setTimeRange(event.target.value);
  };

  const [reportType, setReportType] = useState("Revenue");
  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const [category, setCategory] = useState(0);
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(
      getReportByTime(
        reportType,
        timeRange,
        category,
        format(timeSelected, "yyyy-MM-dd")
      )
    );
    setFilter(reportType);
  }, []);
  // }, [reportType, timeRange, category, timeSelected]);

  const handleApply = () => {
     setTimeRangeSendViaButton(timeRange);
     setTimeSelectedSendViaButton(timeSelected);
    dispatch(
      getReportByTime(
        reportType,
        timeRange,
        category,
        format(timeSelected, "yyyy-MM-dd")
      )
    );
    setFilter(reportType);
  };

  const handleExport = () => {
    let url = `${
      process.env.REACT_APP_HOST
    }/report/owner/export/?exportType=PDF&type=${reportType}&categoryId=${category}&date=${format(
      timeSelected,
      "yyyy-MM-dd"
    )}&timeRange=${timeRange}`;
    window.open(url);
  };

  const handlePrint = () => {
    let url = `${
      process.env.REACT_APP_HOST
    }/report/owner/export/?exportType=HTML&type=${reportType}&categoryId=${category}&date=${format(
      timeSelected,
      "yyyy-MM-dd"
    )}&timeRange=${timeRange}`;
    let print = window.open(url);
    print.print();
  };

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
                        <MenuItem value={"Revenue"}>Revenue</MenuItem>
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
                          label="Category"
                          value={category}
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
                        <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </Grid>

              <Grid item xs={2}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      // label="Select Time"
                      value={timeSelected}
                      views={["year", "month", "day"]}
                      label="Year, month and date"
                      onChange={(newValue) => {
                        setTimeSelected(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField size="small" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </Grid>
              <Grid item style={{ marginTop: 2 }}>
                <Button variant="contained" onClick={handleApply}>
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
              {filter === "Product" && (
                <Product
                  timeRange={timeRangeSendViaButton}
                  reportType={reportType}
                  date={timeSelectedSendViaButton}
                />
              )}
              {filter === "Revenue" && (
                <Revenue
                  timeRange={timeRangeSendViaButton}
                  reportType={reportType}
                  date={timeSelectedSendViaButton}
                />
              )}
            </div>
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
              }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Report;
