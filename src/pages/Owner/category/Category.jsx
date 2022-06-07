import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./category.scss";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import {
  createCategory,
  loadCategories,
} from "../../../redux/actions/categoryAction";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  uploadImage,
  removeTempImage,
} from "../../../redux/actions/imageAction";
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
    dispatch(createCategory(categoryName, avatar));
    handleClose();
  };

  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState();

  const image = useSelector((state) => state.imageReducer);

  useEffect(() => {
    setAvatar(image.url);
  }, image)

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(removeTempImage());
    dispatch(uploadImage(file));
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
              {/* <AddIcon sx={{ marginRight: 1 }} /> */}
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
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category name"
            type="name"
            style={{ width: 200, marginRight: 20 }}
            variant="standard"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <label htmlFor="file">
            <img
              id="image"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => handleUploadImage(e.target.files[0])}
            style={{ display: "none" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Category;
