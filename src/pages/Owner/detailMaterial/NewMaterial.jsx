import "react-datepicker/dist/react-datepicker.css";
import * as React from "react";

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
import { createMaterial } from "../../../redux/actions/materialAction";
import { useDispatch } from "react-redux";

import Select from "react-select";
import {
  uploadImage,
  removeTempImage,
} from "../../../redux/actions/imageAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { getMaterials } from "./../../../redux/actions/materialAction";

const steps = ["Input material name", "Create unit"];

const NewMaterial = (props) => {
  const dispatch = useDispatch();

  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  const [name, setName] = useState("");
  const [rate, setRate] = useState(0);
  const [unit, setUnit] = useState("");
  const [weight, setWeight] = useState(0);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState("");

  const image = useSelector((state) => state.imageReducer.url);

  useEffect(() => {
    setAvatar(image);
  }, [image]);

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(removeTempImage());
    dispatch(uploadImage(file));
  };

  // const unitRedux = useSelector((state) => state.unitReducer.allUnits);
  // unitRedux.map((unit) => listUnit.push({ value: unit.id, label: unit.unit }));

  const listUnit = [];

  const [activeStep, setActiveStep] = useState(0);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const getElementByValue = (array, id) => {
  //   return array.find((element) => {
  //     if (element.id === id) {
  //       return element;
  //     }
  //   });
  // };

  const initialState = () => {
    setName("");
    setUnit("");
    setRate(1);
    setWeight(1);
    setActiveStep(0);
  };

  // useEffect(() => {
  //   let units = [];
  //   if (selectedUnit.length === 0) {
  //     setRows([]);
  //   }

  //   selectedUnit.forEach((item) => {
  //     let unit = getElementByValue(unitRedux, item.value);
  //     units.push(unit);
  //     setRows(units);
  //   });
  // }, [selectedUnit]);

  const handleCreate = () => {
    let units = [];

    // rows.forEach((item) => {
    //   units.push(item);
    // });

    if (unit != "" && weight != 0 && rate != 0) {
      units.push({
        id: "",
        unit: unit,
        netWeight: weight,
        rate: rate,
      });
    }

    const material = {
      name: name,
      image: avatar,
      units: units,
    };

    dispatch(createMaterial(material));
    dispatch(getMaterials());
    dispatch(removeTempImage());
    initialState();
    handleDialogClose();
  };

  return (
    <Dialog
      fullWidth
      minWidth="450px"
      open={props.openDialog}
      onClose={handleDialogClose}
    >
      <DialogTitle>New Material</DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
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
                {/* {activeStep === 1 && (
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <div style={{ width: "50%" }}>
                      <Select
                        options={listUnit}
                        onChange={(value) => setSelectedUnit(value)}
                        value={selectedUnit}
                        isMulti
                      />
                    </div>
                    <TableContainer component={Paper} style={{ width: "50%" }}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Unit</TableCell>
                            <TableCell align="right">Net Weight</TableCell>
                            <TableCell align="right">Rate</TableCell>
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
                              <TableCell>{row.unit}</TableCell>
                              <TableCell align="right">
                                {row.netWeight}
                              </TableCell>
                              <TableCell align="right">{row.rate}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                )} */}

                {activeStep === 1 && (
                  <Stack direction="row" spacing={2}>
                    <TextField
                      id="outlined-basic"
                      label="Unit"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="text"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Rate"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Net Weight"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </Stack>
                )}
              </div>

              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleDialogClose}>Cancel</Button>

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
};

export default NewMaterial;
