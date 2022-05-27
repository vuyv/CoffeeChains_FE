import "react-datepicker/dist/react-datepicker.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState, useEffect, useRef } from "react";
import { Input } from "@mui/material";
import {
  addMaterial,
  removeMaterial,
} from "../../../../redux/actions/materialAction";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";

const Material = () => {
  const [material, setMaterial] = useState("Coffee");
  const [unit, setUnit] = useState("Box");
  const [quantity, setQuantity] = useState(1);
  const [isAdd, setIsAdd] = useState(false);

  const materialList = useSelector((state) => state.materialReducer);
  const [list, setList] = useState(materialList.materials);

  const dispatch = useDispatch();

  const handleChangeMaterial = (e) => {
    setMaterial(e.target.value);
  };

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };

  const handleAdd = () => {
    let item = {
      name: material,
      unit: unit,
      quantity: quantity,
    };
    console.log(item);
    dispatch(addMaterial(item));
    setIsAdd(true);
  };

  const handleRemove = (e) => {
  //   let name = e.target.getAttribute("name");
  //   let removeItem = list.filter((item) => item.name === name);
  //  setList([...list.slice(0, i), ...list.slice(i + 1)]);
    setList(list.slice(list.indexOf(e.target.name, 1)));
    console.log(list)
    // dispatch(removeMaterial(removeItem));
  };

  return (
    <Grid
      container
      spacing={2}
      style={{
        // display: "flex",
        // justifyContent: "center",
        // alignI2ems: "center",
        margin: "10px",
      }}
    >
      <Grid item xs={2}>
        <div>
          <Box sx={{ minWidth: 130 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Material
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={material}
                label="Report Type"
                onChange={handleChangeMaterial}
                size="small"
              >
                <MenuItem value={"Coffee"}>Coffee</MenuItem>
                <MenuItem value={"Milk"}>Milk</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </Grid>
      <Grid item xs={2}>
        <div>
          <Box sx={{ minWidth: 130 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Unit
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={unit}
                label="Category"
                onChange={handleChangeUnit}
                size="small"
              >
                {material === "Coffee" && (
                  <MenuItem value={"Box"}>Box</MenuItem>
                )}
                {material === "Milk" && (
                  <>
                    <MenuItem value={"Bottle 1000ml"}>Bottle 1000ml</MenuItem>
                    <MenuItem value={"Bottle 1000ml"}>Bottle 1000ml</MenuItem>
                    <MenuItem value={"Can 1000ml"}>Can 1000ml</MenuItem>
                    <MenuItem value={"Can 2000ml"}>Can 2000ml</MenuItem>
                  </>
                )}
              </Select>
            </FormControl>
          </Box>
        </div>
      </Grid>
      <Grid item xs={2}>
        <div>
          <Box>
            {/* <div className="formInput"> */}
            {/* <label>Quantity</label> */}
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              // //   validations={[required]}
            />
            {/* </div> */}
          </Box>
        </div>
      </Grid>
      <Grid>
        {isAdd === false ? (
          <Button
            variant="text"
            style={{ marginTop: "20px" }}
            onClick={handleAdd}
          >
            Add
          </Button>
        ) : (
          <CloseIcon
            style={{ marginTop: "20px", marginLeft: "10px" }}
            name={material}
            onClick={handleRemove}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Material;
