import "./DetailProduct.scss";
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
import { useParams } from "react-router-dom";

import { Alert, Button } from "@mui/material";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { updateProduct } from "../../../../redux/actions/productAction";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { loadProducts } from "./../../../../redux/actions/productAction";

const required = (value) => {
  if (!value) {
    return <Alert severity="error">This field is required!</Alert>;
  }
};

const ProductDetail = () => {
  const form = useRef();
  const checkBtn = useRef();
  const { productId } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.productReducer.allProducts.find((product) => {
      return product.id == productId;
    })
  );

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);

  const [categoryOption, setCategoryOption] = useState("");

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.categoryReducer);
  const categoryList = categories.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const getElementByValue = (array, title) => {
    return array.find((element) => {
      return element.value === title;
    });
  };

  useEffect(() => {
    if (Object.keys(categories).length && product) {
      setCategoryOption(getElementByValue(categoryList, product.category.id));
    }
  }, [categories]);

  const imageRedux = useSelector((state) => state.imageReducer);

  const handleUploadImage = (file) => {
    window.setTimeout(() => {
      dispatch(uploadImage(file));
      setImage(imageRedux.url);
      console.log(imageRedux.url);
    }, 3000);
  };

  const handleUpdate = () => {
    dispatch(
      updateProduct(productId, name, price, categoryOption.value, image)
    );
    setIsEdit(!isEdit);
    window.setTimeout(() => {
      navigate("/owner/products");
    }, 2000);
  };

  const handleCancelForm = () => {
    navigate("/owner/products");
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Product Detail</h1>
        </div>

        <div className="container">
          <div
            className="bottom"
            style={{ margin: "auto", width: "60%", padding: 20 }}
          >
            <div className="right">
              <Form
                ref={form}
                style={{ display: "block", width: "100%", height: "300px" }}
              >
                <div className="formInput" style={{ margin: 30 }}>
                  <label>Product Name</label>
                  <Input
                    type="text"
                    class="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEdit}
                  />
                </div>
                <div className="formInput" style={{ margin: 30 }}>
                  <label>Price</label>
                  <Input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={!isEdit}
                  />
                </div>

                <div className="formInput" style={{ margin: 30 }}>
                  <label>Category</label>
                  <Select
                    options={categoryList}
                    class="form-control"
                    onChange={(value) => setCategoryOption(value)}
                    value={categoryOption}
                    isDisabled={!isEdit}
                  />
                </div>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
              <div style={{ marginLeft: "30px", marginBottom: "10px" }}>
                {isEdit ? (
                  <Button
                    variant="contained"
                    style={{ width: 90 }}
                    onClick={handleUpdate}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    style={{ width: 90 }}
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    Edit
                  </Button>
                )}
                {isEdit && (
                  <Button
                    variant="outlined"
                    style={{ marginLeft: 50 }}
                    onClick={handleCancelForm}
                  >
                    Cancel
                  </Button>
                )}
              </div>
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
              <div class="img-circle text-center mb-3">
                <img src={image} alt="Image" />
                {isEdit && (
                  <div className="formInput">
                    <label htmlFor="file">
                      <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => handleUploadImage(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
