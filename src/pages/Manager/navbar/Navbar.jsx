import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import {
  loadOrderById,
  loadOrderByIdInBranch,
} from "../../../redux/actions/orderAction";
import { useDispatch } from "react-redux";
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

  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              props.search(e.target.value);
              setSearchTerm(e.target.value);
            }}
          />
          <SearchOutlinedIcon
            onClick={(e) => {
              // dispatch(loadOrderByIdInBranch(currentUser.branch.id,searchTerm));
              dispatch(
                loadOrderByIdInBranch(currentUser.branch.id, searchTerm)
              );
            }}
          />
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
