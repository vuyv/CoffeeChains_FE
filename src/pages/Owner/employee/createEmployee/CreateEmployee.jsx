import "./new.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { loadRoles } from "../../../../redux/actions/roleAction";
import { loadBranchs } from "../../../../redux/actions/branchAction";
import {
  createEmployee,
  loadEmployees,
} from "../../../../redux/actions/employeeAction";
import { uploadImage } from "../../../../redux/actions/imageAction";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "@mui/material";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

const CreateEmployee = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState();

  const image = useSelector((state) => state.imageReducer);

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(uploadImage(file));
    setAvatar(image.url);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(
        createEmployee(
          username,
          name,
          gender,
          birth,
          phone,
          address,
          branch,
          role,
          avatar
        )
      );
      dispatch(loadEmployees());
      navigate("/owner/employees");
    }
  };

  const handleCancel = () => {
    navigate("/owner/employees");
  }

  const [role, setRole] = useState();
  const { roles } = useSelector((state) => state.roleReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadRoles());
    dispatch(loadBranchs());
  }, [dispatch]);

  const roleList = roles.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const [branch, setBranch] = useState();
  const { branchs } = useSelector((state) => state.branchReducer);

  const branchList = branchs.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];

  const [gender, setGender] = useState();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState(new Date());
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Employee</h1>
        </div>
        <div className="bottom">
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
              </div>
              <div className="formInput">
                <label>Branch</label>
                <Select
                  options={branchList}
                  onChange={(value) => setBranch(value.value)}
                />{" "}
              </div>
              <div className="formInput">
                <label>Role</label>
                <Select
                  options={roleList}
                  onChange={(value) => setRole(value.value)}
                />{" "}
              </div>
              <div className="formInput">
                {/* <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label> */}
                <Input
                  type="file"
                  id="file"
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {/* <button onClick={handleCreate}>Create</button> */}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
              <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
              <Button variant="contained" onClick={handleCreate}>
                {" "}
                Create{" "}
              </Button>
            </Form>
          </div>
          <div className="left">
          <label htmlFor="file" style={{ padding: 100 }}>
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

export default CreateEmployee;
