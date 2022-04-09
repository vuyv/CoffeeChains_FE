// import "./new.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../../../redux/actions/imageAction";
import { useNavigate } from "react-router-dom";
import { loadCategories } from "../../../../redux/actions/categoryAction";
import { createProduct } from "../../../../redux/actions/productAction";

const CreateProduct = () => {
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
    dispatch(createProduct(productName, price, category, avatar));
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
                />
              </div>
              <button onClick={handleCreate}>Create</button>
            </form>
          </div>
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
