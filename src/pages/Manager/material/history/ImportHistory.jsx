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
  getDailyInventoryHistory,
  getWeeklyInventoryHistory,
  getMonthlyInventoryHistory,
  getInventoryHistoryByTime,
} from "../../../../redux/actions/inventoryHistoryAction";

function ImportHistory() {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      setListImportHistory(mapToArray(dailyImport));
    }
    if (newValue === 1) {
      setListImportHistory(mapToArray(weeklyImport));
    }
    if (newValue === 2) {
      setListImportHistory(mapToArray(monthlyImport));
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
    dispatch(getDailyInventoryHistory());
    dispatch(getWeeklyInventoryHistory());
    dispatch(getMonthlyInventoryHistory());
  }, []);

  const dailyImport = useSelector(
    (state) => state.inventoryHistoryReducer.dailyImport
  );

  const weeklyImport = useSelector(
    (state) => state.inventoryHistoryReducer.weeklyImport
  );

  const monthlyImport = useSelector(
    (state) => state.inventoryHistoryReducer.monthlyImport
  );

  const inventoryHistory = useSelector(
    (state) => state.inventoryHistoryReducer.inventoryHistory
  );
  useEffect(() => {
    setListImportHistory(mapToArray(dailyImport));
  }, [dailyImport]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [listImportHistory, setListImportHistory] = useState([]);

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

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="datatable">
            <div className="datatableTitle">Import History</div>
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
                      {listImportHistory.length === 0 && (
                        <TableCell className="tableCell">
                          No rows data
                        </TableCell>
                      )}
                      {listImportHistory
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
                                      getInventoryHistoryByTime(afterFormat)
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
                  count={listImportHistory.length}
                  rowsPerPage={8}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>

            {inventoryHistory.length != 0 && (
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
                          {inventoryHistory.map((row, i) => (
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

export default ImportHistory;
