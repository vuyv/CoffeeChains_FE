import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { loadProducts } from "../../redux/actions/productAction";
import { useDispatch } from "react-redux";
import {useEffect } from "react";
import { useState } from "react";

const Navbar = (props) => {
  const dispatch = useDispatch();
  
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

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              props.search(e.target.value);
            }}
          />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
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
