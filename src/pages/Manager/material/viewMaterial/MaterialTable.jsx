import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TablePagination from "@mui/material/TablePagination";

import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { getMaterialsByBranch } from "./../../../../redux/actions/materialAction";

const MaterialTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const materialList = useSelector(
    (state) => state.materialReducer.materialsInStock
  );

  useEffect(() => {
    dispatch(getMaterialsByBranch());
  }, []);

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const afterFormat = format(date, "MM/dd/yyyy");
    return afterFormat;
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(9);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <div className="datatable">
            <div className="datatableTitle">
              Inventory Management
              <Stack direction="row" spacing={2}>
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
                  onClick={() => navigate("/manager/materials/import")}
                >
                  Import Material
                </Button>
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
                  onClick={() => navigate("/manager/materials/export")}
                >
                  Export Material
                </Button>
              </Stack>
            </div>

            <div
              style={{
                margin: "20px 0px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    id="detailTable"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ paddingLeft: "60px" }}>
                          No.
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Unit</TableCell>
                        <TableCell>Quantity In Stock</TableCell>
                        <TableCell>Import Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {materialList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, i) => (
                          <TableRow key={i + 1 + page * rowsPerPage}>
                            <TableCell
                              component="th"
                              scope="row"
                              style={{ paddingLeft: "60px" }}
                            >
                              {i + 1 + page * rowsPerPage}
                            </TableCell>
                            <TableCell>{row.rawMaterial.name}</TableCell>

                            <TableCell id="myTd">{row.unit.unit}</TableCell>

                            <TableCell
                              align="right"
                              style={{ paddingRight: "50px" }}
                            >
                              {row.quantity}
                            </TableCell>

                            <TableCell>{formatDate(row.createdAt)}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[9]}
                  component="div"
                  count={materialList.length}
                  rowsPerPage={9}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaterialTable;
