import "./DetailProduct.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { uploadImage } from "../../../../redux/actions/imageAction";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../../../redux/actions/productAction";
import { loadCategories } from "../../../../redux/actions/categoryAction";
import { getRecipeByProduct } from "./../../../../redux/actions/recipeAction";
import { getMaterials } from "../../../../redux/actions/materialAction";
import Select from "react-select";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@material-ui/core/TextField";

const DetailProduct = () => {
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
  const [formValues, setFormValues] = useState([]);

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
        id: recipe.materialId,
        material: recipe.materialName,
        amount: recipe.amount,
        image: recipe.image,
      });
    });

    setFormValues(result);
  }, [recipes]);

  const handleChangeAmount = (id, event) => {
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

  const handleUpdate = () => {
    let result = [];
    formValues.map((i) => {
      result.push({ materialId: i.id, amount: i.amount });
    });

    dispatch(
      updateProduct(productId, name, price, categoryOption.value, image, result)
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
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <section class="py-5 my-5">
            <div class="container">
              <div
                class="bg-white shadow rounded-lg d-block d-sm-flex"
                style={{ maxWidth: "1000px" }}
              >
                <div class="profile-tab-nav border-right mb-3">
                  <div class="p-4">
                    <div class="text-center mb-3">
                      <img
                        src={image}
                        alt="Image"
                        style={{
                          height: "auto",
                          width: "auto",
                          maxWidth: "200px",
                          maxHeight: "200px",
                          borderRadius: "4px",
                          // objectFit: "contain",
                        }}
                      />
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
                    <h4 className="text-center">{product.name}</h4>
                  </div>
                </div>
                <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="account"
                    role="tabpanel"
                    aria-labelledby="account-tab"
                  >
                    <h3 class="mb-4">Product Detail</h3>
                    <div class="row" style={{ width: "100%" }}>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Name</label>
                          <input
                            type="text"
                            class="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Price</label>
                          <input
                            type="number"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>Category</label>
                          <Select
                            menuPortalTarget={document.querySelector("body")}
                            styles={{
                              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            options={categoryList}
                            class="form-control"
                            onChange={(value) => setCategoryOption(value)}
                            value={categoryOption}
                            isDisabled={!isEdit}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 class="mb-4">Recipe</h4>
                      <TableContainer
                        component={Paper}
                        style={{
                          width: "95%",
                          maxHeight: "260px",
                          zIndex: -9000,
                        }}
                      >
                        <Table aria-label="simple table" stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>No.</TableCell>
                              <TableCell></TableCell>
                              <TableCell align="left">Material</TableCell>
                              <TableCell align="right">Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {formValues.map((row, index) => (
                              <TableRow
                                key={row.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <img
                                    src={row.image}
                                    style={{ width: "45px", height: "45px" }}
                                  />
                                </TableCell>
                                <TableCell style={{ marginRight: "10px" }}>
                                  {row.material}
                                </TableCell>
                                <TableCell align="right">
                                  <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    name="amount"
                                    size="small"
                                    style={{ width: "100px" }}
                                    type="number"
                                    disabled={!isEdit}
                                    value={row.amount}
                                    onChange={(value) =>
                                      handleChangeAmount(row.id, value)
                                    }
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                    <div
                      className="float-right mt-3"
                      
                    >
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
                          onClick={() => {
                            setIsEdit(!isEdit);
                          }}
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
