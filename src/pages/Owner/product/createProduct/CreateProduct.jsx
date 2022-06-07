import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import CheckButton from "react-validation/build/button";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTempImage,
  uploadImage,
} from "../../../../redux/actions/imageAction";
import { useNavigate } from "react-router-dom";
import { loadCategories } from "../../../../redux/actions/categoryAction";
import {
  createProduct,
  loadProducts,
} from "../../../../redux/actions/productAction";

import { Alert, Button } from "@mui/material";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Stack } from "@mui/material";
import TextField from "@material-ui/core/TextField";

import { getMaterials } from "../../../../redux/actions/materialAction";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";

import { Helmet } from "react-helmet";

const required = (value) => {
  if (!value) {
    return (
      <Alert severity="error" style={{ width: "100%", height: "37px" }}>
        This field is required!
      </Alert>
    );
  }
};

const CreateProduct = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const [formValues, setFormValues] = useState([
    { id: 1, material: {}, amount: "" },
  ]);

  const image = useSelector((state) => state.imageReducer.url);

  useEffect(() => {
    setAvatar(image);
  }, [image]);

  const handleUploadImage = (file) => {
    setFile(file);
    dispatch(uploadImage(file));
  };

  const handleCancelForm = () => {
    navigate("/owner/products");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(getMaterials());
  }, [dispatch]);

  const [category, setCategory] = useState();
  const { categories } = useSelector((state) => state.categoryReducer);

  const categoryList = categories.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  const materials = useSelector((state) => state.materialReducer.materials);
  const tempMaterialList = [];
  const materialList = [];
  materials.map((item) => {
    tempMaterialList.push({ value: item.id, label: item.name });
    materialList.push({ value: item.id, label: item.name });
  });

  const handleAddFields = () => {
    setFormValues([
      ...formValues,
      { id: formValues.length + 1, material: {}, amount: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...formValues];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setFormValues(values);
  };

  const handleChangAmount = (id, event) => {
    const newInputFields = formValues.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setFormValues(newInputFields);
  };

  const filterNameMaterial = (arr, name) => {
    return arr.filter((element) => element.material.label === name);
  };

  const handleChangeMaterial = (id, material, actionMeta) => {
    let arr = filterNameMaterial(formValues, material.label);
    if (arr.length === 0) {
      const materialSelected = formValues.map((i) => {
        if (id === i.id) {
          i[actionMeta.name] = material;
        }
        return i;
      });
      setFormValues(materialSelected);
    } else {
      alert("Exist Material!");
      // handleRemoveFields(id);
    }
  };

  const handleSubmit = () => {};

  const handleCreate = (e) => {
    e.preventDefault();

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      let result = [];
      formValues.map((i) => {
        result.push({ materialId: i.material.value, amount: i.amount });
      });
      dispatch(createProduct(productName, price, category, avatar, result));
      dispatch(removeTempImage());
      dispatch(loadProducts());
      navigate("/owner/products");
    }
  };

  return (
    <>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">
            <h1>Add New Product</h1>
          </div>
          <div style={{ marginTop: "-10px" }}>
            <section class="py-5 my-5">
              <div class="container">
                <div
                  class="bg-white shadow rounded-lg d-block d-sm-flex"
                  style={{ width: "65%", margin: "auto", height: "80%" }}
                >
                  <div class="profile-tab-nav border-right mb-3">
                    <div class="p-4">
                      {/* <div class="form-group"> */}
                      <div
                        style={{
                          margin: "auto",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <label htmlFor="file" style={{ margin: "auto" }}>
                          <img
                            style={{
                              width: "100px",
                              borderRadius: "100%",
                              border: "2px solid #fff",
                            }}
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
                      </div>
                    </div>
                    {/* </div> */}
                    <div
                      class="nav flex-column nav-pills"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <a
                        class="nav-link active"
                        id="account-tab"
                        data-toggle="pill"
                        href="#account"
                        role="tab"
                        aria-controls="account"
                        aria-selected="true"
                      >
                        <i class="fa fa-home text-center mr-1"></i>
                        New Product
                      </a>
                      <a
                        class="nav-link"
                        id="password-tab"
                        data-toggle="pill"
                        href="#password"
                        role="tab"
                        aria-controls="password"
                        aria-selected="false"
                      >
                        <i class="fa fa-key text-center mr-1"></i>
                        Recipe
                      </a>
                    </div>
                  </div>
                  <div class="tab-content p-4" id="v-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="account"
                      role="tabpanel"
                      aria-labelledby="account-tab"
                    >
                      <h3 class="mb-3">Product Information</h3>
                      {/* <div className="row"> */}
                      {/* <div className="right"> */}
                      <Form
                        ref={form}
                        // style={{
                        //   display: "block",
                        //   width: "80%",
                        //   height: "300px",
                        // }}
                        class="form"
                        role="form"
                      >
                        <div class="form-group">
                          <label>Product Name</label>
                          <Input
                            type="text"
                            placeholder="Input product name"
                            onChange={(e) => setProductName(e.target.value)}
                            style={{ width: "100%" }}
                            validations={[required]}
                          />
                        </div>
                        {/* <div className="formInput" style={{ margin: 15 }}>
                            <label>Product Name</label>
                            <Input
                              type="text"
                              placeholder="Input product name"
                              onChange={(e) => setProductName(e.target.value)}
                              style={{ width: "300px", height: "35px" }}
                              validations={[required]}
                            />
                          </div> */}
                        <div class="form-group">
                          <label>Price</label>
                          <Input
                            type="text"
                            placeholder="Input price"
                            onChange={(e) => setPrice(e.target.value)}
                            style={{ width: "100%" }}
                            validations={[required]}
                          />
                        </div>
                        <div class="form-group">
                          <label>Category</label>
                          <Select
                            options={categoryList}
                            onChange={(value) => setCategory(value.value)}
                          />{" "}
                        </div>

                        <CheckButton
                          style={{ display: "none" }}
                          ref={checkBtn}
                        />
                      </Form>
                      {/* </div> */}

                      <div
                        class="form-group float-right"
                        // style={{
                        //   display: "block",
                        //   // marginLeft: -100,
                        //   marginTop: 330,
                        //   marginRight: -50,
                        // }}
                      >
                        <button
                          class="btn btn-primary"
                          type="button"
                          onClick={handleCreate}
                        >
                          Create
                        </button>
                        <button
                          class="btn btn-light"
                          type="button"
                          onClick={handleCancelForm}
                          style={{ marginLeft: "20px" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                    {/* </div> */}

                    <div
                      class="tab-pane fade"
                      id="password"
                      role="tabpanel"
                      aria-labelledby="password-tab"
                    >
                      <h3 class="mb-4">Recipe</h3>

                      <form onSubmit={handleSubmit}>
                        {/* {formValues.map((element) => (
                          <div key={element.id}>
                            <Stack direction="row" spacing={2}>
                              <div style={{ width: "220px", padding: "10px" }}>
                                <Select
                                  name="material"
                                  placeholder="Material"
                                  options={materialList}
                                  onChange={(value, actionMeta) =>
                                    handleChangeMaterial(
                                      element.id,
                                      value,
                                      actionMeta
                                    )
                                  }
                                />
                              </div>
                              <div
                                style={{ width: "100px", marginLeft: "10px" }}
                              >
                                <TextField
                                  name="amount"
                                  label="Amount"
                                  value={element.amount}
                                  type="number"
                                  onChange={(event) =>
                                    handleChangAmount(element.id, event)
                                  }
                                />
                              </div>

                              <IconButton
                                disabled={formValues.length === 1}
                                onClick={() => handleRemoveFields(element.id)}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <IconButton onClick={handleAddFields}>
                                <AddIcon />
                              </IconButton>
                            </Stack>
                          </div>
                        ))} */}
                        {formValues.map((element) => (
                          <div class="form-row" key={element.id}>
                            <div class="col-md-6 mb-3">
                              <Select
                                name="material"
                                placeholder="Material"
                                options={materialList}
                                onChange={(value, actionMeta) =>
                                  handleChangeMaterial(
                                    element.id,
                                    value,
                                    actionMeta
                                  )
                                }
                              />
                            </div>
                            <div class="col-md-3 mb-3">
                              <TextField
                                name="amount"
                                // label="Amount"
                                placeholder="Amount"
                                value={element.amount}
                                type="number"
                                onChange={(event) =>
                                  handleChangAmount(element.id, event)
                                }
                              />
                            </div>
                            <div class="col-md-3 mb-3">
                              <IconButton
                                disabled={formValues.length === 1}
                                onClick={() => handleRemoveFields(element.id)}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <IconButton onClick={handleAddFields}>
                                <AddIcon />
                              </IconButton>
                            </div>
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Helmet>
              <script
                src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                type="text/javascript"
              />
            </Helmet>
            <Helmet>
              <script
                src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"
                type="text/javascript"
              />
            </Helmet>
            <Helmet>
              <script
                src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                type="text/javascript"
              />
            </Helmet>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
