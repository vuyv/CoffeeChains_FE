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
import { Helmet } from "react-helmet";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { Stack } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import { getRecipeByProduct } from "./../../../../redux/actions/recipeAction";
import { getMaterials } from "../../../../redux/actions/materialAction";
import recipeReducer from "./../../../../redux/reducer/recipeReducer";

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
  const [formValues, setFormValues] = useState([]);
  const [formSubmit, setFormSubmit] = useState([
    { id: "", material: {}, amount: "" },
  ]);

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
    dispatch(getMaterials());
    dispatch(getRecipeByProduct(product.id));
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
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      let result = [];
      formValues.map((i) => {
        result.push({ materialId: i.material.value, amount: i.amount });
      });
      dispatch(
        updateProduct(
          productId,
          name,
          price,
          categoryOption.value,
          image,
          result
        )
      );
    }
    // setIsEdit(!isEdit);
    // window.setTimeout(() => {
    //   navigate("/owner/products");
    // }, 2000);
  };

  const handleCancelForm = () => {
    navigate("/owner/products");
  };

  const materials = useSelector((state) => state.materialReducer.materials);
  const materialList = [];
  materials.map((item) => {
    materialList.push({ value: item.id, label: item.name });
  });

  const recipes = useSelector((state) => state.recipeReducer.recipeByProduct);

  useEffect(() => {
    let result = [];
    recipes.map((recipe) => {
      result.push({
        id: uuidv4(),
        material: { value: recipe.materialId, label: recipe.materialName },
        amount: recipe.amount,
      });
    });
    setFormValues(result);
  }, [recipes]);

  const handleAddFields = () => {
    setFormValues([...formValues, { id: uuidv4(), material: {}, amount: "" }]);
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

  const handleChangeMaterial = (id, event, actionMeta) => {
    const materialSelected = formValues.map((i) => {
      if (id === i.id) {
        i[actionMeta.name] = event;
      }
      return i;
    });
    setFormValues(materialSelected);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Product Detail</h1>
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
                            onChange={(e) =>
                              handleUploadImage(e.target.files[0])
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    class="nav flex-column nav-pills"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      class="border-top nav-link active "
                      id="account-tab"
                      data-toggle="pill"
                      href="#account"
                      role="tab"
                      aria-controls="account"
                      aria-selected="true"
                    >
                      <i class="fa fa-home text-center mr-1"></i>
                      Product
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

                    <Form ref={form} class="form" role="form">
                      <div class="form-group">
                        <label>Product Name</label>
                        <Input
                          type="text"
                          placeholder="Input product name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          style={{ width: "100%" }}
                          validations={[required]}
                          disabled={!isEdit}
                        />
                      </div>

                      <div class="form-group">
                        <label>Price</label>
                        <Input
                          type="text"
                          placeholder="Input price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          style={{ width: "100%" }}
                          validations={[required]}
                          disabled={!isEdit}
                        />
                      </div>
                      <div class="form-group">
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

                    <div class="form-group float-right">
                      {isEdit ? (
                        <button
                          class="btn btn-primary"
                          type="button"
                          style={{ width: 70 }}
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          class="btn btn-primary"
                          type="button"
                          style={{ width: 70 }}
                          onClick={() => setIsEdit(!isEdit)}
                        >
                          Edit
                        </button>
                      )}
                      {isEdit && (
                        <button
                          class="btn btn-light"
                          type="button"
                          onClick={handleCancelForm}
                          style={{ marginLeft: "20px" }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="password"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                  >
                    <h3 class="mb-4">Recipe</h3>

                    <form>
                      {formValues.map((element) => (
                        <div class="form-row" key={element.id}>
                          <div class="col-md-6 mb-3">
                            <Select
                              name="material"
                              placeholder="Material"
                              // isDisabled={!isEdit}
                              isDisabled="true"
                              defaultValue={element.material}
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
                              disabled={!isEdit}
                              value={element.amount}
                              type="number"
                              onChange={(event) =>
                                handleChangAmount(element.id, event)
                              }
                            />
                          </div>
                          {/* {isEdit && (
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
                            )} */}
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
  );
};

export default ProductDetail;
