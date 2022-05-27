import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";

import Material from "./Material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";

import { MenuProps, useStyles } from "./utils";

const CreateMaterial = () => {
  const [show, setShow] = useState(false);
  const [unit, setUnit] = useState("");

  const options = ["Condensed Milk", "Fresh Milk", "Coffee"];

  const classes = useStyles();
  const [selected, setSelected] = useState([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  function createData(name, unit) {
    return { name, unit };
  }

  const [rows, setRows] = useState([]);
  const condensedMilkList = [
    createData("Condensed Milk", ["Can 1l", "Can 2l"]),
  ];
  const freshMilkList = [createData("Fresh Milk", ["Bottle 1l", "Bottle 2l"])];
  const coffeeList = [createData("Robusta Coffee", ["Box 5kg", "Box 10kg"])];

  const handleAdd = () => {
    let result = [];
    selected.forEach((item) => {
      if (item === "Condensed Milk") {
        condensedMilkList.forEach((item) => result.push(item));
      }
      if (item === "Fresh Milk") {
        freshMilkList.forEach((item) => result.push(item));
      }
      if (item === "Coffee") {
        coffeeList.forEach((item) => result.push(item));
      }
    });
    setRows(result);
    updateList(result);
    setShow(true);
  };

  const [list, updateList] = useState(rows);

  const handleRemove = (e) => {
    let pos = list
      .map(function (e) {
        return e.name;
      })
      .indexOf(e.target.getAttribute("data-rowid"));
    list.splice(pos, 1);
    console.log(list);
    // setRows(list);
  };

  const handleSubmit = () => {
    let result = [];
    // rows.forEach((item) => {
    //   let newItem = {
    //     name: item.name,
    //     unit: unit,
    //   };
    //   result.push(newItem);
    // });
    // console.log(result);

    let tableRows = document.getElementById("detailTable").rows;
    for (let i = 1; i < tableRows.length; i++) {
      let myrow = tableRows[i];
      let newItem = {
        name: myrow.cells[1].firstChild.data,
        quantity: myrow.cells[2].getElementsByTagName("input")[0].value,
      };
      var select = myrow.cells[3].getElementsByTagName("Select");
      console.log(select.options[select.selectedIndex].text);

      // result.push(newItem);
    }
    // var select = document.getElementById("unit");
    // var text = select.options[select.selectedIndex].text;
    // console.log(text);
  };

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add Material</h1>
        </div>
        <div>
          <FormControl
            className={classes.formControl}
            style={{ margin: "10px 20px" }}
          >
            <InputLabel id="mutiple-select-label">Material</InputLabel>
            <Select
              labelId="mutiple-select-label"
              multiple
              value={selected}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              <MenuItem
                value="all"
                classes={{
                  root: isAllSelected ? classes.selectedAll : "",
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    classes={{ indeterminate: classes.indeterminateColor }}
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 && selected.length < options.length
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.selectAllText }}
                  primary="Select All"
                />
              </MenuItem>
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={selected.indexOf(option) > -1} />
                  </ListItemIcon>
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            style={{ margin: "20px" }}
            onClick={handleAdd}
          >
            Add
          </Button>
          {show === true && (
            <>
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
                        <TableCell style={{ paddingLeft: "60px" }}>
                          No.
                        </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit</TableCell>
                        {/* <TableCell>Exchange</TableCell> */}
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, i) => (
                        <TableRow key={i + 1}>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ paddingLeft: "60px" }}
                          >
                            {i + 1}
                          </TableCell>
                          <TableCell>{row.name}</TableCell>
                          {/* <TableCell>{row.quantity}</TableCell> */}
                          <TableCell id="myTd">
                            <TextField
                              label="Quantity"
                              type="number"
                              size="small"
                              style={{ marginRight: "-50px", width: "150px" }}
                            />
                          </TableCell>
                          {/* <TableCell>{row.unit}</TableCell> */}
                          <TableCell>
                            <FormControl variant="outlined">
                              <InputLabel htmlFor="outlined-age-native-simple">
                                Unit
                              </InputLabel>
                              <Select
                                native
                                id="unit"
                                label="Unit"
                                size="small"
                                // value
                                // onChange={(e) => e.target.value}
                                style={{ marginRight: "-50px", width: "150px" }}
                              >
                                {row.unit.map((key) => (
                                  <option>{key}</option>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          {/* <TableCell>
                          {row.exchange} {" / 1 Bin"}
                        </TableCell> */}
                          <TableCell>
                            <CloseIcon
                              style={{ marginLeft: "10px" }}
                              onClick={handleRemove}
                              data-rowid={row.name}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "20px",
                }}
              >
                <Button variant="contained" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateMaterial;
