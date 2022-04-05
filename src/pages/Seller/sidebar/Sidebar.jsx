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
import { removeCurrentUser } from "../../../redux/actions/employeeAction";
const Sidebar = () => {
  const state = useSelector((state) => state.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logOut());
    dispatch(removeCurrentUser());
    navigate("/login");
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/seller" style={{ textDecoration: "none" }}>
          <span className="logo">Coffee</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/seller/orders"  style={{ textDecoration: "none" }}>
          {/* <p className="title">TYPE OF PRODUCTS</p> */}
            <li>
              <CreditCardIcon className="icon" />
              <span>PRODUCTS</span>
            </li>
          </Link>
          <li>
            <DiscountIcon className="icon" />
            <span>Discount</span>
          </li>
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
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
