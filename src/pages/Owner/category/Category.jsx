import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./category.scss";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  createCategory,
  loadCategories,
} from "../../../redux/actions/categoryAction";
import { loadProductByCategory } from "../../../redux/actions/productAction";

import CardCategory from "./CardCategory";

const Category = () => {
  const categoryFromRedux = useSelector(
    (state) => state.categoryReducer.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCategories());
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [categoryName, setCategoryName] = useState();

  const handleCreate = () => {
    dispatch(createCategory(categoryName));
    handleClose();
  };

  return (
    <div className="category">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Category Management
            <Button variant="outlined" onClick={handleClickOpen}>
              <AddCircleOutlineIcon />
              New Category
            </Button>
          </div>
          <div className="widgets">
            {categoryFromRedux.map((item, index) => (
              <CardCategory key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
