import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DiscountIcon from "@mui/icons-material/Discount";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/authAction";
import FeedIcon from "@mui/icons-material/Feed";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
    navigate("/login");
  };
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/manager" style={{ textDecoration: "none" }}>
          <span className="logo">Coffee</span>
        </Link>
      </div>
      {/* <hr /> */}
      <div className="center">
        {/* <span style={{ textTransform: "uppercase", marginLeft: 20 }}>
          {currentUser.branch.name}
        </span>*/}
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
