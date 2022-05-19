import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { loadOrderById, loadOrderByIdInBranch } from "../../../redux/actions/orderAction";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Navbar = (props) => {
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  const[searchTerm, setSearchTerm] = useState("")
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              props.search(e.target.value);
              setSearchTerm(e.target.value)
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
