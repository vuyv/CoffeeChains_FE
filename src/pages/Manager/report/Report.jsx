import React, { useState, useEffect, useCallback, createRef } from "react";
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
import { useReactToPrint } from "react-to-print";
import { useRef, forwardRef } from "react";
import Pdf from "react-to-pdf";
import ExportProduct from "./ExportProduct";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const Report = () => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  // const ref = createRef();

  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  const categories = useSelector((state) => state.categoryReducer.categories);

  //datepicker
  const [date, setDate] = React.useState(new Date());
  const [timeRange, setTimeRange] = useState("Daily");
  const [reportType, setReportType] = useState("Employee");
  const [category, setCategory] = useState();

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  useEffect(() => {
    categories.unshift({ id: 0, name: "All" });
    setCategory(categories[0].id);
  }, [categories]);

  const handleChangeReportType = (e) => {
    setReportType(e.target.value);
  };

  const handleChangeTimeRange = (event) => {
    setTimeRange(event.target.value);
  };

  const handleChangeTime = () => {
    if (timeRange === "Daily") {
      document.getElementById("timeReport").innerHTML =
        "Date: " + format(date, "dd/MM/yyy");
    } else if (timeRange == "Weekly") {
      // const date = value
      // const day = date.getDay();
      // const first = date.getDate() - day + (day == 0 ? -6 : 1);
      // const last = date.getDate() + 7;
      // const monday = new Date(date.setDate(first));
      // const sunday = new Date(date.setDate(last))
      // // document.getElementById("timeReport").innerHTML =
      // //   "From: " + monday + "<br>To:   " + sunday;
      // // console.log(first + " " + last + " " + day)
      // console.log(value + "-------------" + date)
      // console.log(
      //   format(monday, "dd/MM/yyyy") + " " + format(sunday, "dd/MM/yyyy")
      // );
    } else if (timeRange == "Monthly") {
      let y = date.getFullYear();
      let m = date.getMonth();
      let firstDay = format(new Date(y, m, 1), "dd/MM/yyy");
      let lastDay = format(new Date(y, m + 1, 0), "dd/MM/yyy");
      document.getElementById("timeReport").innerHTML =
        "From: " + firstDay + "<br>To:" + lastDay;
    }
  };

  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleApply = () => {
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

  // const handlePrint = useReactToPrint({
  //   content: () => ref.current,
  // });

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">Report</div>
          <div>
            <Grid container spacing={2} style={{ justifyContent: "center" }}>
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
              {reportType === "Product" && (
                <div>
                  <Product
                    timeRange={timeRange}
                    reportType={reportType}
                    date={date}
                  />

                  <div
                    ref={(el) => (ref.current = el)}
                    style={{ position: "absolute", left: "-1000px", top: 0 }}
                  >
                    <ExportProduct
                      timeRange={timeRange}
                      reportType={reportType}
                      date={date}
                    />
                  </div>
                </div>
              )}

              {reportType === "Employee" && (
                <Employee
                  timeRange={timeRange}
                  reportType={reportType}
                  date={date}
                />
              )}
            </div>
            {/* </div> */}

            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2, md: 4 }}
              justifyContent="center"
              alignItems="center"
              margin={2}
            >
              <Pdf targetRef={ref} filename="report.pdf">
                {({ toPdf }) => (
                  <Button
                    variant="outlined"
                    style={{ marginLeft: 10, marginBottom: 10 }}
                    onClick={toPdf}
                  >
                    Export
                  </Button>
                )}
              </Pdf>

              <ReactToPrint content={() => ref.current}>
                <PrintContextConsumer>
                  {({ handlePrint }) => (
                    <Button
                      variant="contained"
                      style={{
                        marginLeft: 10,
                        marginBottom: 10,
                      }}
                      onClick={handlePrint}
                    >
                      Print
                    </Button>
                  )}
                </PrintContextConsumer>
              </ReactToPrint>

              {/* <ReactToPrint
                trigger={() => {
                  // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                  // to the root node of the returned component as it will be overwritten.
                  return (
                    <Button
                      variant="contained"
                      style={{
                        marginLeft: 10,
                        marginBottom: 10,
                      }}
                      //   onClick={handlePrint}
                    >
                      Print
                    </Button>
                  );
                }}
                content={() => ref.current}
              /> */}
            </Stack>
          </div>
        </div>

        <div>
          {/* <Dialog
            // open={open}
            // TransitionComponent={Transition}
            // keepMounted
            // onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="lg"
          >
            <DialogContent ref={ref}>
              <DialogContentText id="alert-dialog-slide-description">
                <h4 style={{ textTransform: "uppercase", textAlign: "center" }}>
                  {timeRange} {reportType} Report
                </h4>
                <Stack
                  direction="row"
                  justifyContent="space-evenly"
                  marginTop={2}
                  marginBottom={2}
                >
                  <Stack direction="column">
                    <h6>Branch: {currentUser.branch.name}</h6>
                    <h6>Address: {currentUser.branch.address}</h6>
                  </Stack>
                  <Stack direction="column">
                    <h6>Date of Report: {format(new Date(), "dd/MM/yyyy")}</h6>
                    <h6 id="timeReport"></h6>
                  </Stack>
                </Stack>
                {reportType === "Product" && filter && (
                  <ExportProduct map={filter} />
                )}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handlePrint}>Agree</Button>
            </DialogActions>
          </Dialog> */}
        </div>
      </div>
    </div>
  );
};

export default Report;
