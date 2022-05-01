import "./sidebar.scss";
import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DiscountIcon from "@mui/icons-material/Discount";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Box,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../redux/actions/authAction";
import { removeCurrentUser } from "../../../redux/actions/employeeAction";
import { loadCategories } from "../../../redux/actions/categoryAction";
import { panelStyle } from "./sidebar.style";
import { loadProductByCategory } from "../../../redux/actions/productAction";
import { loadActiveProductByCategory } from './../../../redux/actions/productAction';

const useStyles = makeStyles(panelStyle);

const Sidebar = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(logOut());
    dispatch(removeCurrentUser());
    navigate("/login");
  };

  const handleChangeCategory = (id) => {
    dispatch(loadActiveProductByCategory(id));
  };

  const categories = useSelector((state) => state.categoryReducer.categories);

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

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
          <Link to="/seller" style={{ textDecoration: "none" }}>
            <ExpansionPanel
              className={classes.panel}
              elevation={5}
              style={{ padding: 0 }}
            >
              <li>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon fontSize="small" />}
                >
                  <EmojiFoodBeverageIcon
                    // fontSize="medium"
                    // color="primary"
                    style={{ "font-size": "18px", color: "#7451f8" }}
                  />
                  <span>Products</span>
                </ExpansionPanelSummary>
              </li>

              <ExpansionPanelDetails>
                <ul>
                  {categories.map((cate) => (
                    <li key={cate.id}>
                      <Typography
                        variant="span"
                        noWrap
                        onClick={() => handleChangeCategory(cate.id)}
                        style={{
                          textTransform: "uppercase",
                          textDecoration: "none",
                        }}
                      >
                        &nbsp; {cate.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Link>
          <Link to="/seller/discounts" style={{ textDecoration: "none" }}>
            <li>
              <DiscountIcon className="icon" />
              <span>Discount</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <Link to="/seller/profile" style={{ textDecoration: "none" }}>
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
