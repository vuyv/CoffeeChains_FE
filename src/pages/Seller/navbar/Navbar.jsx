import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import {
  loadOrderByIdInBranch,
  removeOrder,
  loadOrderByOrdinalNumber,
} from "../../../redux/actions/orderAction";
import { loadProducts } from "../../../redux/actions/productAction";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const order = useSelector((state) => state.orderReducer.order);

  const handleSearch = () => {
    dispatch(loadOrderByOrdinalNumber(value));
    navigate(`/seller/orders/${value}`);
  };

  const currentUser = JSON.parse(localStorage.getItem("current_user"));

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  window.setTimeout(() => {
    setAvatar(currentUser.avatar);
    setName(currentUser.name);
  }, 5);

  useEffect(() => {
    dispatch(loadProducts());
  }, []);

  const { totalQuantity } = useSelector((state) => state.cartReducer);

  return (
    <div className="navbar" style={{ flexWrap: "none" }}>
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            id="search"
            onChange={(e) => {
              setValue(e.target.value);
              props.search(e.target.value);
            }}
          />
          <SearchOutlinedIcon onClick={handleSearch} />
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
          <div className="item">Welcome, {name}</div>

          <div className="item">
            <img src={avatar} alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
