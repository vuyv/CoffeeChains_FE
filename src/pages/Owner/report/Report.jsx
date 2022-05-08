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
function Report(props) {
  const dispatch = useDispatch();
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

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

  const handleApply = () => {
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
              <Grid item xs={2}>
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
                  timeRange={timeRange}
                  reportType={reportType}
                  date={timeSelected}
                />
              )}
              {filter === "Revenue" && (
                <Revenue
                  timeRange={timeRange}
                  reportType={reportType}
                  date={timeSelected}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
