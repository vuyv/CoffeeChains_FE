import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useState, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployeeInBranch,
  loadEmployeesInBranch,
} from "../../../../redux/actions/employeeAction";
import {
  uploadImage,
  removeTempImage,
} from "../../../../redux/actions/imageAction";
import { useNavigate } from "react-router-dom";

import "./CreateEmployee.scss";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { useEffect } from "react";

const required = (value) => {
  if (!value) {
    return <Alert severity="error">This field is required!</Alert>;
  }
};

const validPhone = (value) => {
  if (typeof value !== "undefined") {
    var pattern = new RegExp(/^[0-9\b]+$/);

    if (!pattern.test(value)) {
      return <Alert severity="error">Please enter only number.</Alert>;
    } else if (value.length != 10) {
      return <Alert severity="error">Please enter valid phone number</Alert>;
    }
  }
};

const CreateEmployeeInBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [gender, setGender] = useState();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const image = useSelector((state) => state.imageReducer.url);

  useEffect(() => {
    setAvatar(image);
  }, [image]);

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(uploadImage(file));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        createEmployeeInBranch(
          username,
          name,
          gender,
          birth,
          phone,
          address,
          avatar
        )
      );
      dispatch(removeTempImage());
      dispatch(loadEmployeesInBranch());
      navigate("/manager/employees");
    }
  };

  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Employee</h1>
        </div>
        <div className="bottom" style={{ width: "65%", margin: "auto" }}>
          <div className="right">
            <Form ref={form}>
              <div className="formInput">
                <label>Username</label>
                <Input
                  type="text"
                  placeholder="Input username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  validations={[required]}
                />
              </div>
              <div className="formInput">
                <label>Full Name</label>
                <Input
                  type="text"
                  placeholder="Input fullname"
                  onChange={(e) => setName(e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="formInput">
                <label>Gender</label>
                <Select
                  options={genders}
                  onChange={(value) => setGender(value.value)}
                />
              </div>
              <div className="formInput">
                <label>Birthday</label>
                <DatePicker
                  className="formInput"
                  selected={birth}
                  onChange={(date) => setBirth(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <Input
                  type="text"
                  placeholder="Input phone number"
                  onChange={(e) => setPhone(e.target.value)}
                  validations={[required, validPhone]}
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
              </div>
              <div className="formInput">
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
              <div>
                {/* <Button variant="outlined">Cancel</Button> */}
                <Button
                  variant="contained"
                  style={{
                    marginLeft: "-280px",
                    marginBottom: "10px",
                    marginTop: "-8px",
                  }}
                  onClick={handleCreate}
                >
                  Create
                </Button>
              </div>
            </Form>
          </div>
          <div className="left" style={{ "max-width": "180px" }}>
            <label htmlFor="file" style={{ padding: 31 }}>
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeInBranch;
