import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { loadRoles } from "../../redux/actions/roleAction";
import { loadBranchs } from "../../redux/actions/branchAction";
import { createEmployee } from "../../redux/actions/employeeAction";
import { uploadImage } from "../../redux/actions/imageAction";
import { useNavigate } from "react-router-dom";

const New = () => {
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
    navigate("/employees");
  };

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
            <form>
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Input username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className="formInput">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Input fullname"
                  onChange={(e) => setName(e.target.value)}
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
                <input
                  type="text"
                  placeholder="Input phone number"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Input address"
                  onChange={(e) => setAddress(e.target.value)}
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
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <button onClick={handleCreate}>Create</button>
            </form>
          </div>
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
