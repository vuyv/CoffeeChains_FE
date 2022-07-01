import React from "react";
import { useDispatch } from "react-redux";

import Select from "react-select";
import {
  uploadImage,
  removeTempImage,
} from "../../../../redux/actions/imageAction";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@material-ui/core/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getMaterials } from "../../../../redux/actions/materialAction";
import {
  createProduct,
  loadProducts,
} from "../../../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";

const steps = ["Input product infor", "Create recipe"];

function NewProduct(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState(0);

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState("");

  const image = useSelector((state) => state.imageReducer.url);

  useEffect(() => {
    setAvatar(image);
  }, [image]);

  useEffect(() => {
    dispatch(getMaterials());
  }, []);

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(removeTempImage());
    dispatch(uploadImage(file));
  };

  const { categories } = useSelector((state) => state.categoryReducer);

  const categoryList = categories.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const materials = useSelector((state) => state.materialReducer.materials);

  const materialList = materials.map((item) => {
    return { value: item.id, label: item.name };
  });

  const [rows, setRows] = useState([{ material: {}, amount: 0 }]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const initialState = () => {
    setName("");
    setPrice(0);
    setAvatar("");
    setFile(null);
    setSelectedMaterial([]);
    setActiveStep(0);
  };

  const handleCreate = () => {
    let result = [];
    rows.map((i) => {
      result.push({ materialId: i.material.id, amount: i.amount });
    });

    dispatch(createProduct(name, price, category, avatar, result));
    dispatch(removeTempImage());
    dispatch(loadProducts());
    navigate("/owner/products");

    initialState();
    handleDialogClose();
  };

  const getElementByValue = (array, id) => {
    return array.find((element) => {
      if (element.id === id) {
        return element;
      }
    });
  };

  useEffect(() => {
    let units = [];
    if (selectedMaterial.length === 0) {
      setRows([]);
    }

    selectedMaterial.forEach((item) => {
      let material = getElementByValue(materials, item.value);
      units.push({ material, amount: 0 });
      setRows(units);
    });
  }, [selectedMaterial]);

  const handleChangAmount = (id, event) => {
    const newInputFields = rows.map((i) => {
      if (id === i.material.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setRows(newInputFields);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={props.openDialog}
      onClose={handleDialogClose}
      PaperProps={{ style: { overflowY: "visible" } }}
    >
      <DialogTitle>New Product</DialogTitle>
      <DialogContent style={{ overflowY: "visible" }}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <div></div>
          ) : (
            <React.Fragment>
              <div style={{ margin: "30px" }}>
                {activeStep === 0 && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Price"
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div style={{ width: "100%" }}>
                      <Select
                        placeholder="Category"
                        options={categoryList}
                        onChange={(value) => setCategory(value.value)}
                      />
                    </div>
                    <label htmlFor="file" style={{ paddingLeft: "30px" }}>
                      <img
                        id="image"
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                      />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => handleUploadImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </Stack>
                )}
                {activeStep === 1 && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <div style={{ width: "50%" }}>
                      <b>Select materials</b>
                      <Select
                        options={materialList}
                        onChange={(value) => setSelectedMaterial(value)}
                        value={selectedMaterial}
                        isMulti
                      />
                    </div>
                    <TableContainer
                      component={Paper}
                      style={{ width: "50%", maxHeight: "260px" }}
                    >
                      <Table aria-label="simple table" stickyHeader>
                        <TableHead>
                          <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left">Material</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.length === 0 && (
                            <TableCell>No row data</TableCell>
                          )}
                          {rows.map((row) => (
                            <TableRow
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell>
                                <img
                                  src={row.material.image}
                                  style={{ width: "45px", height: "45px" }}
                                />
                              </TableCell>
                              <TableCell style={{ marginRight: "10px" }}>
                                {row.material.name}
                              </TableCell>
                              <TableCell align="right">
                                <TextField
                                  id="outlined-basic"
                                  variant="outlined"
                                  name="amount"
                                  size="small"
                                  style={{ width: "100px" }}
                                  type="number"
                                  onChange={(event) =>
                                    handleChangAmount(row.material.id, event)
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                )}
              </div>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleCreate}>Create</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default NewProduct;
