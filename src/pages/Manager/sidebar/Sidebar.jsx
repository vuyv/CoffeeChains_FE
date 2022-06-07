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

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const [currentBranch, setCurrentBranch] = useState("");

  window.setTimeout(() => {
    setCurrentBranch(currentUser.branch.name);
  }, 5);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/manager" style={{ textDecoration: "none" }}>
          <span className="logo">Coffee</span>
        </Link>
      </div>

      <span
        style={{
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          color: "#7451f8"
        }}
      >
        {currentBranch}
      </span>

      <div className="center">
        <hr />
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
          <Link to="/manager/materials" style={{ textDecoration: "none" }}>
            <li>
              <InventoryIcon className="icon" />
              <span>Inventory</span>
            </li>
          </Link>
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
  );
};

export default Sidebar;
