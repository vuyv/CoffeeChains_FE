import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@material-ui/core/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import {
  addToMaterialArray,
  getMaterials,
  getMaterialById,
  addMaterials,
  clearMaterials,
} from "../../../../redux/actions/materialAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import { removeFromMaterialArray } from "./../../../../redux/actions/materialAction";
import { v4 as uuidv4 } from "uuid";
import { useRef } from "react";

const CreateMaterial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectRef = useRef("");

  const [show, setShow] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState();
  const [formValues, setFormValues] = useState([
    { id: uuidv4(), name: "", quantity: "", units: [] },
  ]);

  useEffect(() => {
    dispatch(getMaterials());
  }, []);

  const materials = useSelector((state) => state.materialReducer.materials);
  const materialList = [];
  materials.map((item) => {
    materialList.push({ value: item.id, label: item.name });
  });

  const materialItems = useSelector(
    (state) => state.materialReducer.materialItems
  );

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    selected.forEach((item) => {
      let material = getElementByValue(materials, item.label);
      dispatch(addToMaterialArray(material));
    });
  }, [selected]);

  useEffect(() => {
    let result = [];
    materialItems.forEach((material) => {
      let listUnit = [];
      material.units.forEach((item) => {
        listUnit.push({ value: item.id, label: item.unit });
      });
      result.push({
        id: uuidv4(),
        name: material.name,
        quantity: 1,
        units: listUnit,
      });
    });
    setFormValues(result);
  }, [materialItems, selected]);

  const handleChangeInput = (id, event) => {
    const newInputFields = formValues.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setFormValues(newInputFields);
  };

  const getElementByValue = (array, title) => {
    return array.find((element) => {
      if (element.name === title) {
        return element;
      }
    });
  };

  const handleChangeMaterial = (value) => {
    setSelected(value);
  };

  const handleAdd = () => {
    setShow(true);
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "40px",
    }),
  };

  const handleRemove = (item) => {
    dispatch(removeFromMaterialArray(item));
  };

  const handleSubmit = () => {
    // dispatch(addMaterials(result));
    // navigate("/manager/materials");
    // dispatch(clearMaterials());
  };

  const UnitDropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState();
    function handleSelectChange(value) {
      setSelectedOption(value);
    }

    return (
      <Select
        name="filters"
        placeholder="Unit"
        options={props.units}
        value={selectedOption}
        onChange={handleSelectChange}
      />
    );
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
          <Stack direction="row">
            <div style={{ width: "50%", margin: "10px 20px" }}>
              <Select
                name="filters"
                placeholder="Materials"
                value={selected}
                options={materialList}
                onChange={handleChangeMaterial}
                isMulti
                styles={colourStyles}
              />
            </div>
            <Button
              variant="contained"
              style={{ margin: "10px" }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </Stack>

          <form style={{ margin: "10px" }}>
            <TableContainer
              component={Paper}
              sx={{ width: "80%", margin: "auto" }}
            >
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                id="detailTable"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{ paddingLeft: "60px" }}>No.</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit</TableCell>

                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <TableBody>
                {formValues.map((element, i) => (
                  <TableRow
                    key={element.id}
                    className="row"
                    // style={{ margin: "10px" }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ paddingLeft: "60px" }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="name"
                        // label="Material"
                        value={element.name}
                        type="text"
                        style={{ paddingLeft: "160px" }}
                        // onChange={(event) => handleChangeInput(element.id, event)}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="quantity"
                        // label="Quantity"
                        value={element.quantity}
                        type="number"
                        onChange={(event) =>
                          handleChangeInput(element.id, event)
                        }
                        style={{ width: "80px" }}
                      />
                    </TableCell>
                    {/* <div style={{ width: "150px", margin: "10px" }}> */}
                    <TableCell>
                      <div style={{ width: "180px", paddingLeft: "70px" }}>
                        {/* <Select
                          name="filters"
                          placeholder="Unit"
                          options={element.units}
                          // value={selectedUnit}
                          // onChange={handleChangeUnit}
                        /> */}
                        <UnitDropdown key={element.id} {...element} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <CloseIcon
                        style={{ marginLeft: "70px" }}
                        onClick={() => {
                          handleRemove(element);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMaterial;
