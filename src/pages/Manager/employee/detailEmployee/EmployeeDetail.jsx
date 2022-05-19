import "./style.scss";
import "./styleCSS.css";
import "./single.scss";
import Sidebar from "../../sidebar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { uploadImage } from "../../../../redux/actions/imageAction";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployeeById,
  updateEmployee,
} from "../../../../redux/actions/employeeAction";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadRoles } from "../../../../redux/actions/roleAction";
import { loadBranchs } from "../../../../redux/actions/branchAction";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validPhone = (value) => {
  if (typeof value !== "undefined") {
    var pattern = new RegExp(/^[0-9\b]+$/);

    if (!pattern.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter only number.
        </div>
      );
    } else if (value.length != 10) {
      return (
        <div className="alert alert-danger" role="alert">
          Please enter valid phone number
        </div>
      );
    }
  }
};

const EmployeeDetail = () => {
  const checkBtn = useRef();
  const form = useRef();
  const [isEdit, setIsEdit] = useState(false);

  const { employeeId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const employee = useSelector((state) =>
    state.employeeReducer.employees.find((employee) => {
      return employee.id == employeeId;
    })
  );

  const [birth, setBirth] = useState(new Date(employee.birth));
  const [username, setUsername] = useState(employee.username);
  const [name, setName] = useState(employee.name);
  const [phone, setPhone] = useState(employee.phone);
  const [address, setAddress] = useState(employee.address);
  const [avatar, setAvatar] = useState(employee.avatar);
  const [genderOption, setGenderOption] = useState(null);
  const [branchOption, setBranchOption] = useState(null);
  const [roleOption, setRoleOption] = useState(null);

  const getElementByValue = (array, title) => {
    return array.find((element) => {
      return element.value === title;
    });
  };

  useEffect(() => {
    dispatch(loadRoles());
    dispatch(loadBranchs());
  }, [dispatch]);

  const { roles } = useSelector((state) => state.roleReducer);
  const roleList = roles.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

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

  useEffect(() => {
    if (Object.keys(roles).length && employee) {
      setRoleOption(getElementByValue(roleList, employee.role.id));
      setBranchOption(getElementByValue(branchList, employee.branch.id));
      setGenderOption(getElementByValue(genders, employee.gender));
    }
  }, [roles, branchs]);

  const image = useSelector((state) => state.imageReducer.url);
  useEffect(() => {
    if (Object.keys(image).length != 0) {
      setAvatar(image);
    }
  }, [image]);

  const handleUploadImage = (file) => {
    dispatch(uploadImage(file));
  };

  const handleUpdate = () => {
    dispatch(
      updateEmployee(
        employeeId,
        username,
        name,
        genderOption.value,
        birth,
        phone,
        address,
        branchOption.value,
        roleOption.value,
        avatar
      )
    );
    setIsEdit(!isEdit);
  };

  const handleCancelForm = () => {
    navigate("/manager/employees");
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div>
          <section class="py-5 my-5">
            <div class="container">
              <div class="bg-white shadow rounded-lg d-block d-sm-flex">
                <div class="profile-tab-nav border-right">
                  <div class="p-4">
                    <Stack alignItems="center" justifyContent="center">
                      <Avatar
                        alt="Avatar"
                        src={avatar}
                        className="avatar"
                        sx={{ height: "80px", width: "80px", marginBottom: 2 }}
                      />
                      {isEdit && (
                        <div className="formInput">
                          <label htmlFor="file">
                            <DriveFolderUploadOutlinedIcon className="icon" />
                          </label>
                          <input
                            type="file"
                            id="file"
                            onChange={(e) =>
                              handleUploadImage(e.target.files[0])
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                      <h4>{employee.name}</h4>
                    </Stack>
                  </div>
                  <div
                    class="nav flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      class="nav-link active"
                      id="account-tab"
                      data-toggle="pill"
                      href="#account"
                      role="tab"
                      aria-controls="account"
                      aria-selected="true"
                    >
                      <i class="fa fa-home text-center mr-1"></i>
                      Account
                    </a>
                  </div>
                </div>
                <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="account"
                    role="tabpanel"
                    aria-labelledby="account-tab"
                  >
                    <h3 class="mb-4">Account Settings</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Username</label>
                          <input
                            type="text"
                            class="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Full Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Gender</label>
                          <Select
                            options={genders}
                            onChange={(value) => setGenderOption(value)}
                            value={genderOption}
                            isDisabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Birthday</label>
                          <DatePicker
                            className="form-control"
                            selected={birth}
                            onChange={(date) => setBirth(date)}
                            dateFormat="dd/MM/yyyy"
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Phone Number</label>
                          <input
                            type="text"
                            class="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            class="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        {isEdit ? (
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={() => setIsEdit(!isEdit)}
                          >
                            Edit
                          </button>
                        )}
                        {isEdit && (
                          <button
                            class="btn btn-light"
                            type="button"
                            onClick={handleCancelForm}
                            style={{ marginLeft: "15px" }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Helmet>
            <script
              src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
              type="text/javascript"
            />
          </Helmet>
          <Helmet>
            <script
              src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
              type="text/javascript"
            />
          </Helmet>
          <Helmet>
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
              type="text/javascript"
            />
          </Helmet>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
