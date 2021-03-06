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
  getMaterialsByBranch,
  exportMaterials,
} from "../../../../redux/actions/materialAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { estimateProducts } from "../../../../redux/actions/productAction";

import Select from "react-select";

const ExportMaterial = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState([
    { id: "", name: "", quantity: "", units: [] },
  ]);
  const [formSubmit, setFormSubmit] = useState([
    { id: "", name: "", quantity: "", unit: {} },
  ]);

  useEffect(() => {
    dispatch(getMaterialsByBranch());
  }, []);

  const materials = useSelector(
    (state) => state.materialReducer.materialsInStock
  );
  const tempMaterialList = [];
  materials.map((material) => {
    if (material.quantity > 0) {
      tempMaterialList.push({
        value: material.rawMaterial.id,
        label: material.rawMaterial.name,
      });
    }
  });

  const materialList = [
    ...new Map(tempMaterialList.map((item) => [item["label"], item])).values(),
  ];

  const [exportMaterialList, setExportMaterialList] = useState([]);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let arr = [];
    selected.forEach((item) => {
      let material = getElementByValue(materials, item.label);
      arr.push(material);
    });
    setExportMaterialList(arr);
  }, [selected]);

  useEffect(() => {
    let result = [];
    let formSubmit = [];

    exportMaterialList.forEach((material) => {
      let tempList = [];
      material.rawMaterial.units.forEach((item) => {
        materials.forEach((i) => {
          if (i.unit.id === item.id) {
            tempList.push({ value: item.id, label: item.unit });
          }
        });
      });

      let listUnit = [
        ...new Map(tempList.map((item) => [item["label"], item])).values(),
      ];

      result.push({
        id: material.rawMaterial.id,
        name: material.rawMaterial.name,
        image: material.rawMaterial.image,
        quantity: 1,
        units: listUnit,
        quantityInStock: material.quantity,
      });

      formSubmit.push({
        id: material.rawMaterial.id,
        name: material.rawMaterial.name,
        quantity: 1,
        unit: listUnit[0],
      });
    });

    setFormValues(result);
    setFormSubmit(formSubmit);
  }, [exportMaterialList, selected]);

  const handleChangeInput = (id, event) => {
    const newInputFields = formSubmit.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setFormSubmit(newInputFields);
  };

  const getElementByValue = (array, title) => {
    return array.find((element) => {
      if (element.rawMaterial.name === title) {
        return element;
      }
    });
  };

  const handleChangeUnit = (id, event, actionMeta) => {
    const unitSelected = formSubmit.map((i) => {
      if (id === i.id) {
        i[actionMeta.name] = event;
      }
      return i;
    });
    setFormSubmit(unitSelected);
  };

  const handleChangeMaterial = (value) => {
    setSelected(value);
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "40px",
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

    dispatch(exportMaterials(result));
    navigate("/manager/materials/inventory");
    setExportMaterialList([]);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Export Material</h1>
        </div>
        <div>
          <div style={{ width: "50%", margin: "20px" }}>
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

          <form style={{ margin: "10px" }} onSubmit={handleSubmit}>
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
                  <TableRow
                    key={element.id}
                    className="row"
                    // style={{ margin: "10px" }}
                  >
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell style={{ paddingLeft: "110px" }}>
                      <img
                        src={element.image}
                        style={{ width: "45px", height: "45px" }}
                      />
                    </TableCell>
                    <TableCell style={{ paddingLeft: "120px" }}>
                      {element.name}
                    </TableCell>
                    <TableCell style={{ paddingLeft: "90px" }}>
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
              <Button
                style={{ color: "white", background: "#1976d2" }}
                type="submit"
              >
                Export
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExportMaterial;
