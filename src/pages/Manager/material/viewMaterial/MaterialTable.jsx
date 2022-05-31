import React, { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getMaterialsByBranch } from "./../../../../redux/actions/materialAction";
import { format } from "date-fns";

const MaterialTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const materialList = useSelector(
    (state) => state.materialReducer.importMaterials
  );

  useEffect(() => {
    dispatch(getMaterialsByBranch());
  }, []);

  const formatDate = (createdDate) => {
    const date = new Date(createdDate);
    const afterFormat = format(date, "MM/dd/yyyy");
    return afterFormat;
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Material Management
            <Button
              variant="outlined"
              onClick={() => navigate("/manager/materials/new")}
            >
              Add Material
            </Button>
          </div>

          <div
            style={{
              margin: "20px 0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TableContainer component={Paper} sx={{ width: "80%" }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                id="detailTable"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ paddingLeft: "60px" }}>No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Quantity In Stock</TableCell>
                    <TableCell>Import Date</TableCell>
                    {/* <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materialList.map((row, i) => (
                    <TableRow key={row.inventoryId}>
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ paddingLeft: "60px" }}
                      >
                        {i + 1}
                      </TableCell>
                      <TableCell>{row.rawMaterial.name}</TableCell>

                      <TableCell id="myTd">{row.unit.unit}</TableCell>

                      <TableCell>{row.quantity}</TableCell>

                      <TableCell>{formatDate(row.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialTable;
