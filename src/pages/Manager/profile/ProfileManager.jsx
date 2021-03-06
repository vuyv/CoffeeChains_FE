import "./style.scss";
// import "./styleCSS.css";
import "./single.scss";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { uploadImage } from "../../../redux/actions/imageAction";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../../redux/actions/employeeAction";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { loadRoles } from "../../../redux/actions/roleAction";
import { loadBranchs } from "../../../redux/actions/branchAction";
import { changePassword } from "../../../redux/actions/employeeAction";
import { makeStyles } from "@material-ui/core/styles";
import { profileStyles } from "./profile.style";

const useStyles = makeStyles(profileStyles);

const ProfileManager = () => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const getElementByValue = (array, title) => {
    return array.find((element) => {
      return element.value === title;
    });
  };

  const [birth, setBirth] = useState(new Date(currentUser.birth));
  const [username, setUsername] = useState(currentUser.username);
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [address, setAddress] = useState(currentUser.address);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [genderOption, setGenderOption] = useState(null);
  const [branchOption, setBranchOption] = useState(null);
  const [roleOption, setRoleOption] = useState(null);

  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

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

  useEffect(() => {
    dispatch(loadRoles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadBranchs());
  }, [dispatch]);

  const genders = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "ANOTHER", label: "Another" },
  ];

  useEffect(() => {
    if (Object.keys(roles).length && currentUser) {
      setRoleOption(getElementByValue(roleList, currentUser.role.id));
      setBranchOption(getElementByValue(branchList, currentUser.branch.id));
      setGenderOption(getElementByValue(genders, currentUser.gender));
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
        currentUser.id,
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
    window.location.reload();
  };

  const handleChangePassword = () => {
    dispatch(
      changePassword(currentUser.id, oldPassword, newPassword, confirmPassword)
    );
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div>
          <section class="py-5 my-5">
            <div class="container">
              <div
                class="bg-white shadow rounded-lg d-block d-sm-flex"
                style={{ width: "80%", margin: "auto", height: "80%" }}
              >
                <div class="profile-tab-nav border-right">
                  <div class="p-4">
                    <Stack className={classes.stack}>
                      <Avatar
                        alt="Avatar"
                        src={avatar}
                        className={classes.avatar}
                        sx={{
                          height: "80px",
                          width: "80px",
                          marginBottom: 2,
                        }}
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
                      <h4>{currentUser.name}</h4>
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
                    <a
                      class="nav-link"
                      id="password-tab"
                      data-toggle="pill"
                      href="#password"
                      role="tab"
                      aria-controls="password"
                      aria-selected="false"
                    >
                      <i class="fa fa-key text-center mr-1"></i>
                      Change Password
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
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Branch</label>
                          <Select
                            // options={branchList}
                            // onChange={(value) => setBranchOption(value)}
                            value={branchOption}
                            isDisabled="true"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Role</label>
                          <Select
                            // options={roleList}
                            class="form-control"
                            // onChange={(value) => setRoleOption(value)}
                            value={roleOption}
                            isDisabled="true"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="float-right">
                        {isEdit ? (
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={handleUpdate}
                            style={{ marginRight: 10 }}
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
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="password"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                  >
                    <h3 class="mb-4">Password Settings</h3>

                    <form class="form" role="form" autocomplete="off">
                      <div class="form-group">
                        <label for="inputPasswordOld">Current Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="inputPasswordOld"
                          required=""
                          autofocus
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      <div class="form-group">
                        <label for="inputPasswordNew">New Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="inputPasswordNew"
                          required=""
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {/* <span class="form-text small text-muted">
                          The password must be 8-20 characters, and must{" "}
                          <em>not</em> contain spaces.
                        </span> */}
                      </div>
                      <div class="form-group">
                        <label for="inputPasswordNewVerify">Verify</label>
                        <input
                          type="password"
                          class="form-control"
                          id="inputPasswordNewVerify"
                          required=""
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span class="form-text small text-muted">
                          To confirm, type the new password again.
                        </span>
                      </div>
                      <div class="form-group float-right">
                        <button
                          class="btn btn-primary"
                          onClick={handleChangePassword}
                          style={{ marginRight: 10 }}
                        >
                          Change
                        </button>
                        <button class="btn btn-light" float-right>
                          Cancel
                        </button>
                      </div>
                    </form>
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

export default ProfileManager;
