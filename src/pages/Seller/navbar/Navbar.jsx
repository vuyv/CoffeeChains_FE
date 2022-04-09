import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
<<<<<<< HEAD
import { getTotals } from "../../../redux/actions/cartAction";
import { useState, useEffect, React } from "react";

const Navbar = (props) => {
  const { totalQuantity } = useSelector((state) => state.cartReducer);
=======
import Alert from "@mui/material/Alert";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  loadOrderByIdInBranch,
  removeOrder,
} from "../../../redux/actions/orderAction";
import { loadOrderInBranch } from "./../../../redux/actions/orderAction";
import orderReducer from "./../../../redux/reducer/orderReducer";
import { format } from "date-fns";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState();

  // useEffect(() => {
  //   dispatch(loadOrderInBranch());
  // }, []);

  const order = useSelector((state) =>
    state.orderReducer.ordersInBranch.find((order) => {
      return order.id == value;
    })
  );

  const currentUser = useSelector((state) => state.employeeReducer.currentUser);

  const handleFindOrderById = () => {
    // if (currentUser.branch.id === order.createdBy.branch.id) {
    // dispatch(loadOrderByIdInBranch(currentUser.branch.id, value));
    // window.setTimeout(() => {
      dispatch(loadOrderByIdInBranch(currentUser.branch.id, value));
      navigate(`/seller/orders/${currentUser.branch.id}/${value}`);
    // }, 500);
    // }
  };
>>>>>>> e085ffe27b03ec82f6f1b0053065c50195bd3887

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            onChange={(e) => setValue(e.target.value)}
          />
          <SearchOutlinedIcon onClick={handleFindOrderById} />
        </div>
        <div className="items">
          <div className="item">
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => props.parentCallback(true)}
            >
              <AddShoppingCartIcon />
              <span className="quantity">
                <span>{totalQuantity}</span>
              </span>
            </IconButton>
          </div>
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
