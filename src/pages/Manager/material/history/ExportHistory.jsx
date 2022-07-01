import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { format } from "date-fns";
import { Tabs, Tab } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  countDailyQuantityByTime,
  countMonthlyQuantityByTime,
  countWeeklyQuantityByTime,
  getDailyInventoryByTime,
} from "../../../../redux/actions/materialAction";

function ExportHistory() {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setListExportHistory(mapToArray(dailyQuantityByDate));
    }
    if (newValue === 1) {
      setListExportHistory(mapToArray(weeklyQuantityByDate));
    }
    if (newValue === 2) {
      setListExportHistory(mapToArray(monthlyQuantityByDate));
    }
  };

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const afterFormat = format(date, "MM/dd/yyyy HH:mm:ss");
    return afterFormat;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(countDailyQuantityByTime());
    dispatch(countWeeklyQuantityByTime());
    dispatch(countMonthlyQuantityByTime());
  }, []);

  const dailyQuantityByDate = useSelector(
    (state) => state.materialReducer.dailyQuantityByDate
  );

  const weeklyQuantityByDate = useSelector(
    (state) => state.materialReducer.weeklyQuantityByDate
  );

  const monthlyQuantityByDate = useSelector(
    (state) => state.materialReducer.monthlyQuantityByDate
  );

  const dailyInventories = useSelector(
    (state) => state.materialReducer.dailyInventories
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [listExportHistory, setListExportHistory] = useState([]);

  const mapToArray = (arr) => {
    let result = [];
    arr.forEach((item) => {
      result.push({
        time: item[0],
        sumQuantity: item[1],
      });
    });
    return result;
  };

  useEffect(() => {
    setListExportHistory(mapToArray(dailyQuantityByDate));
  }, []);

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="datatable">
            <div className="datatableTitle">Export History</div>

            <div
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Tabs value={selectedTab} onChange={handleChangeTab}>
                <Tab label="today"></Tab>
                <Tab label="week"></Tab>
                <Tab label="month"></Tab>
              </Tabs>
            </div>

            <div
              style={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <TableContainer component={Paper} sx={{ width: "100%" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ paddingLeft: "60px" }}>
                          No.
                        </TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listExportHistory.length === 0 && (
                        <TableCell className="tableCell">
                          No rows data
                        </TableCell>
                      )}
                      {listExportHistory
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((element, i) => (
                          <TableRow key={i + 1 + page * rowsPerPage}>
                            <TableCell style={{ paddingLeft: "60px" }}>
                              {i + 1 + page * rowsPerPage}
                            </TableCell>
                            <TableCell>{formatDate(element.time)}</TableCell>
                            <TableCell
                              align="right"
                              style={{ paddingRight: "70px" }}
                            >
                              {element.sumQuantity}
                            </TableCell>
                            <TableCell>
                              <div className="cellAction">
                                <div
                                  className="viewButton"
                                  onClick={() => {
                                    const date = new Date(element.time);
                                    const afterFormat = format(
                                      date,
                                      "yyyy-MM-dd HH:mm:ss"
                                    );
                                    dispatch(
                                      getDailyInventoryByTime(afterFormat)
                                    );
                                    handleClickOpen();
                                  }}
                                >
                                  View
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[8]}
                  component="div"
                  count={listExportHistory.length}
                  rowsPerPage={8}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>

            {dailyInventories.length != 0 && (
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
              >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell style={{ paddingLeft: "60px" }}>
                              No.
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Quantity</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dailyInventories.map((row, i) => (
                            <TableRow
                              key={i + 1}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                style={{ paddingLeft: "60px" }}
                              >
                                {i + 1}
                              </TableCell>
                              <TableCell>{row.rawMaterial.name}</TableCell>
                              <TableCell>{row.unit.unit}</TableCell>
                              <TableCell>{row.quantity}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ExportHistory;
