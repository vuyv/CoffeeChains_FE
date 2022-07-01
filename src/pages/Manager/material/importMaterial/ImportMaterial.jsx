import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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
  getMaterials,
  addMaterialsToInventory,
} from "../../../../redux/actions/materialAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Select from "react-select";
import { getAllUnits } from "../../../../redux/actions/unitAction";

const ImportMaterial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState([
    { id: "", name: "", quantity: 0, units: [] },
  ]);
  const [formSubmit, setFormSubmit] = useState([
    { id: "", name: "", quantity: "", unit: {} },
  ]);

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getAllUnits());
  }, []);

  const materials = useSelector((state) => state.materialReducer.materials);
  const materialList = [];
  materials.map((item) => {
    materialList.push({ value: item.id, label: item.name });
  });

  const [materialItems, setMaterialItems] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let arr = [];
    selected.forEach((item) => {
      let material = getElementByValue(materials, item.label);
      arr.push(material);
    });
    setMaterialItems(arr);
  }, [selected]);

  useEffect(() => {
    let result = [];
    let formSubmit = [];

    materialItems.forEach((material) => {
      let tempList = [];

      material.units.forEach((item) => {
        tempList.push({ value: item.id, label: item.unit });
      });

      let listUnit = [
        ...new Map(tempList.map((item) => [item["label"], item])).values(),
      ];

      result.push({
        id: material.id,
        name: material.name,
        image: material.image,
        quantity: 1,
        units: listUnit,
      });

      formSubmit.push({
        id: material.id,
        name: material.name,
        quantity: 1,
        unit: listUnit[0],
      });
    });
    setFormValues(result);
    setFormSubmit(formSubmit);
  }, [materialItems, selected]);

  const handleChangeInput = (id, event) => {
    const newInputFields = formSubmit.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setFormSubmit(newInputFields);
  };

  const handleChangeUnit = (id, event, actionMeta) => {
    const unitSelected = formSubmit.map((i) => {
      if (id == i.id) {
        i[actionMeta.name] = event;
      }
      return i;
    });
    setFormSubmit(unitSelected);
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

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "45px",
    }),
  };

  const removeItem = (arr, item) => {
    return arr.filter((f) => f.value !== item.id);
  };

  const handleRemove = (element) => {
    let arr = [...selected];
    let temp = removeItem(arr, element);
    setSelected(temp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let result = [];
    formSubmit.forEach((item) => {
      result.push({
        materialId: item.id,
        quantity: item.quantity,
        unitId: item.unit.value,
      });
    });
    dispatch(addMaterialsToInventory(result));
    navigate("/manager/materials/inventory");
    setMaterialItems([]);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Import Material</h1>
        </div>
        <div>
          <Stack direction="row" spacing={2}>
            <div style={{ width: "50%", marginLeft: "20px" }}>
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
          </Stack>

          <form style={{ margin: "20px" }} onSubmit={handleSubmit}>
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
                    <TableCell>No.</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Unit</TableCell>

                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <TableBody>
                {formValues.length === 0 && (
                  <TableCell className="tableCell">No rows data</TableCell>
                )}
                {formValues.map((element, i) => (
                  <TableRow key={element.id} className="row">
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell style={{ paddingLeft: "110px" }}>
                      <img
                        src={element.image}
                        style={{ width: "45px", height: "45px" }}
                      />
                    </TableCell>
                    <TableCell style={{ paddingLeft: "105px" }}>
                      {element.name}
                    </TableCell>
                    <TableCell style={{ paddingLeft: "85px" }}>
                      <TextField
                        name="quantity"
                        defaultValue={element.quantity}
                        id="outlined-basic"
                        variant="outlined"
                        size="small"
                        style={{ width: "100px" }}
                        type="number"
                        onChange={(event) =>
                          handleChangeInput(element.id, event)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div style={{ width: "170px", paddingLeft: "50px" }}>
                        <Select
                          menuPortalTarget={document.querySelector("body")}
                          name="unit"
                          placeholder="Unit"
                          options={element.units}
                          defaultValue={element.units[0]}
                          value={element.selectedUnit}
                          onChange={(event, actionMeta) => {
                            handleChangeUnit(element.id, event, actionMeta);
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <CloseIcon
                        style={{ marginLeft: "50px" }}
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
              <Button
                style={{ color: "white", background: "#1976d2" }}
                type="submit"
              >
                Import
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImportMaterial;
