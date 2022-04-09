// import "./new.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../../redux/actions/imageAction";
import { useNavigate } from "react-router-dom";
import { loadCategories } from "../../../../redux/actions/categoryAction";
import { createProduct } from "../../../../redux/actions/productAction";

import { Alert, Button } from "@mui/material";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = (value) => {
  if (!value) {
    return <Alert severity="error">This field is required!</Alert>;
  }
};

const CreateProduct = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState();

  const image = useSelector((state) => state.imageReducer);

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(uploadImage(file));
    setAvatar(image.url);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(createProduct(productName, price, category, avatar));
      navigate("/owner/products");
    }
  };

  const handleCancelForm = () => {
    navigate("/owner/products");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const [category, setCategory] = useState();
  const { categories } = useSelector((state) => state.categoryReducer);

  const categoryList = categories.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
<<<<<<< HEAD
        <div className="bottom" style={{ width: "900px", margin: "auto" }}>
          <div className="right">
            <form>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Input product name"
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Input price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="formInput">
                <label>Category</label>
                <Select
                  options={categoryList}
                  onChange={(value) => setCategory(value.value)}
                />{" "}
              </div>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => handleUploadImage(e.target.files[0])}
                  style={{ display: "none" }}
=======

        <div className="container">
          <div
            className="bottom"
            style={{ margin: "auto", width: "60%", padding: 20 }}
          >
            <div className="right">
              <Form
                ref={form}
                style={{ display: "block", width: "100%", height: "400px" }}
              >
                <div className="formInput" style={{ margin: 30 }}>
                  <label>Product Name</label>
                  <Input
                    type="text"
                    placeholder="Input product name"
                    onChange={(e) => setProductName(e.target.value)}
                    validations={[required]}
                  />
                </div>
                <div className="formInput" style={{ margin: 30 }}>
                  <label>Price</label>
                  <Input
                    type="text"
                    placeholder="Input price"
                    onChange={(e) => setPrice(e.target.value)}
                    validations={[required]}
                  />
                </div>

                <div className="formInput" style={{ margin: 30 }}>
                  <label>Category</label>
                  <Select
                    options={categoryList}
                    onChange={(value) => setCategory(value.value)}
                  />{" "}
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
            <div
              className="left"
              style={{
                display: "block",
                marginLeft: -400,
                marginTop: 105,
                marginRight: -50,
              }}
            >
              <label htmlFor="file">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
>>>>>>> e085ffe27b03ec82f6f1b0053065c50195bd3887
                />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => handleUploadImage(e.target.files[0])}
                style={{ display: "none" }}
              />
              <Button
                variant="contained"
                style={{
                  position: "absolute",
                  marginTop: 250,
                  marginLeft: -50,
                }}
                onClick={handleCreate}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                style={{
                  position: "absolute",
                  marginTop: 250,
                  marginLeft: -150,
                }}
                onClick={handleCancelForm}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
