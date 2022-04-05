import "./DetailProduct.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { uploadImage } from "../../../../redux/actions/imageAction";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../../../redux/actions/productAction";
import { loadCategories } from "../../../../redux/actions/categoryAction";
import Select from "react-select";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
const DetailProduct = () => {
  const { productId } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.productReducer.products.find((product) => {
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

  const handleUploadImage = (file) => {
    dispatch(uploadImage(file));
    setImage(image.url);
  };

  const handleUpdate = () => {
    dispatch(
      updateProduct(productId, name, price, categoryOption.value, image)
    );
    setIsEdit(!isEdit);
  };

  const handleCancelForm = () => {
    window.location.reload();
  };
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div>
          <section class="py-5 my-5">
            <div class="container">
              <div class="bg-white shadow rounded-lg d-block d-sm-flex">
                <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="account"
                    role="tabpanel"
                    aria-labelledby="account-tab"
                  >
                    <h3 class="mb-4">Product Detail</h3>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Product name</label>
                          <input
                            type="text"
                            class="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Price</label>
                          <input
                            type="text"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            disabled={!isEdit}
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
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
                      </div>
                    </div>
                    <div>
                      <div>
                        {isEdit ? (
                          <button
                            class="btn btn-primary"
                            type="button"
                            onClick={handleUpdate}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            class="btn btn-primary"
                            type="button"
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
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="password"
                    role="tabpanel"
                    aria-labelledby="password-tab"
                  ></div>
                </div>
                <div class="profile-tab-nav border-left">
                  <div class="p-4">
                    <div class="img-circle text-center mb-3">
                      <img src={image} alt="Image" class="shadow" />
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
                    <h4 class="text-center">{name}</h4>
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
