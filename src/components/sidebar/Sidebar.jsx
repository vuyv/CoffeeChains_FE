import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DiscountIcon from "@mui/icons-material/Discount";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import FeedIcon from "@mui/icons-material/Feed";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/authAction";
import CategoryIcon from "@mui/icons-material/Category";
import FastfoodIcon from "@mui/icons-material/Fastfood";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/owner" style={{ textDecoration: "none" }}>
          <span className="logo">Coffee</span>
        </Link>
      </div>
      <hr style={{ marginTop: "0em" }} />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/owner" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/owner/report" style={{ textDecoration: "none" }}>
            <li>
              <FeedIcon className="icon" />
              <span>Report</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/owner/branch" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Branch</span>
            </li>
          </Link>
          <Link to="/owner/employees" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Employee</span>
            </li>
          </Link>
          <Link to="/owner/category" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Category</span>
            </li>
          </Link>
          <Link to="/owner/products" style={{ textDecoration: "none" }}>
            <li>
              <FastfoodIcon className="icon" />
              <span>Product</span>
            </li>
          </Link>
          <Link to="/owner/discounts" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Promotion</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/owner/profile" style={{ textDecoration: "none" }}>
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
