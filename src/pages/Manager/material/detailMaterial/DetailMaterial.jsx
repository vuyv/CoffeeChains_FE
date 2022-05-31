import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


const required = (value) => {
  if (!value) {
    return <Alert severity="error">This field is required!</Alert>;
  }
};

const DetailMaterial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState();
  const [importDate, setImportDate] = useState(new Date());
  const [quantity, setQuantity] = useState("");
  const [updateDate, setUpdateDate] = useState(new Date());

  const handleUpdate = () => {
   
    setIsEdit(!isEdit);
    window.setTimeout(() => {
      navigate("/manager/materials");
    }, 2000);
  };

  const handleCancelForm = () => {
    navigate("/manager/materials");
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Detail Material</h1>
        </div>
        <div className="bottom" style={{ width: "65%", margin: "auto" }}>
          <div className="right">
            <Form ref={form}>
              <div className="formInput">
                <label>Name</label>
                <Input
                  type="text"
                  class="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  validations={[required]}
                  disabled={!isEdit}
                />
              </div>
              <div className="formInput">
                <label>Unit</label>
                <Select
                  options={unit}
                  onChange={(value) => setUnit(value.value)}
                  disabled={!isEdit}
                />
              </div>
              <div className="formInput">
                <label>Quantity</label>
                <Input
                  type="number"
                  placeholder="Input quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="formInput">
                <label>Import Date</label>
                <DatePicker
                  className="formInput"
                  selected={importDate}
                  //   onChange={(date) => setImportDate(date)}
                  dateFormat="dd/MM/yyyy"
                  disabled={true}
                />
              </div>

              <div className="formInput">
                <label>Update Date</label>
                <DatePicker
                  className="formInput"
                  selected={updateDate}
                  onChange={(date) => setUpdateDate(date)}
                  dateFormat="dd/MM/yyyy"
                  disabled={!isEdit}
                />
              </div>
              {/* <div className="formInput">
                <label>Phone</label>
                <Input
                  type="text"
                  placeholder="Input phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <Input
                  type="text"
                  placeholder="Input address"
                  onChange={(e) => setAddress(e.target.value)}
                  validations={[required]}
                />
              </div> */}
              {/* <div className="formInput">
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}
              
              {/* <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}

              <div
                className="formInput"
                style={{ paddingLeft: "150px", paddingTop: "30px", paddingBottom: "10px" }}
              >
                {isEdit ? (
                  <Button
                    variant="contained"
                    style={{ width: 90 }}
                    onClick={handleUpdate}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ width: 90 }}
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Edit
                  </Button>
                )}
                {isEdit && (
                  <Button
                    variant="outlined"
                    style={{ marginLeft: 50 }}
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </Form>
            {/* <div
              style={{
                marginLeft: "750px",
                marginBottom: "10px",
                marginTop: "20px",
              }}
            >
              {isEdit ? (
                <Button
                  variant="contained"
                  style={{ width: 90 }}
                  onClick={handleUpdate}
                >
                  Save
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ width: 90 }}
                  onClick={() => setIsEdit(!isEdit)}
                >
                  Edit
                </Button>
              )}
              {isEdit && (
                <Button
                  variant="outlined"
                  style={{ marginLeft: 50 }}
                  onClick={handleCancelForm}
                >
                  Cancel
                </Button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMaterial;
