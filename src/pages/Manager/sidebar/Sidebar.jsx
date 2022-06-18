import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DiscountIcon from "@mui/icons-material/Discount";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../../redux/actions/authAction";
import FeedIcon from "@mui/icons-material/Feed";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useState } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import { Helmet } from "react-helmet";
import { History } from "@material-ui/icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { KeyboardArrowUp } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const [currentBranch, setCurrentBranch] = useState("");
  const [show, setShow] = useState(false);

  window.setTimeout(() => {
    setCurrentBranch(currentUser.branch.name);
  }, 5);

  const handleOpen = () => {
    setShow(!show);
  };

  return (
    <>
      <div className="sidebar">
        <div className="top">
          <Link to="/manager" style={{ textDecoration: "none" }}>
            <span className="logo">{currentBranch}</span>
          </Link>
        </div>

        <div className="center">
          <hr style={{ marginTop: "0em" }} />
          <ul>
            <p className="title">MAIN</p>
            <Link to="/manager" style={{ textDecoration: "none" }}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/manager/report" style={{ textDecoration: "none" }}>
              <li>
                <FeedIcon className="icon" />
                <span>Report</span>
              </li>
            </Link>
            <p className="title">LISTS</p>
            <Link to="/manager/employees" style={{ textDecoration: "none" }}>
              <li>
                <PersonOutlineIcon className="icon" />
                <span>Employee</span>
              </li>
            </Link>
            <Link to="/manager/orders" style={{ textDecoration: "none" }}>
              <li>
                <CreditCardIcon className="icon" />
                <span>Orders</span>
              </li>
            </Link>
            <Link to="/manager/discounts" style={{ textDecoration: "none" }}>
              <li>
                <DiscountIcon className="icon" />
                <span>Discount</span>
              </li>
            </Link>
            <Link
              to="/manager/materials/inventory"
              style={{ textDecoration: "none" }}
            >
              <li>
                <InventoryIcon className="icon" />
                <span>Inventory</span>
              </li>
            </Link>
            <Link
              to=""
              id="accordion"
              style={{ textDecoration: "none" }}
              onClick={handleOpen}
            >
              <li
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <History className="icon" />
                <span>History</span>

                {show ? (
                  <KeyboardArrowUp
                    className="icon"
                    style={{ marginLeft: "80px" }}
                  />
                ) : (
                  <KeyboardArrowDownIcon
                    className="icon"
                    style={{ marginLeft: "80px" }}
                  />
                )}
              </li>

                <ul
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                  style={{ marginLeft: "15px", backgroundColor: "#f9f9f9" }}
                >
                  <Link
                    to="/manager/materials/import_history"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <DensityMediumIcon className="icon" />
                      <span>Import History</span>
                    </li>
                  </Link>
                  <Link
                    to="/manager/materials/export_history"
                    style={{ textDecoration: "none" }}
                  >
                    <li>
                      <EventNoteIcon className="icon" />
                      <span>Export History</span>
                    </li>
                  </Link>
                </ul>

            </Link>

            <p className="title">USER</p>
            <Link to="/manager/profile" style={{ textDecoration: "none" }}>
              <li>
                <AccountCircleOutlinedIcon className="icon" />
                <span>Profile</span>
              </li>
            </Link>
            <li onClick={handleSignOut}>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      </div>
      <Helmet>
        <script
          src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
          integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
          integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
          integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
          crossorigin="anonymous"
        ></script>
      </Helmet>
    </>
  );
};

export default Sidebar;
