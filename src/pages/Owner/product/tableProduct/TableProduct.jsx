// import "./TableEmployee.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../../../datatablesource";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  loadProducts,
  loadProductById,
  disableProduct,
  loadProductByCategory,
} from "../../../../redux/actions/productAction";
import { useRef } from "react";
import { loadCategories } from "./../../../../redux/actions/categoryAction";
import { Stack } from "@mui/material";
import NewProduct from "../createProduct/NewProduct";

const TableProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rows, setRows] = useState();
  const [content, setContent] = useState();
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [openDialog, setOpenDialog] = useState(false);

  const products = useSelector((state) => state.productReducer);
  const product = useSelector((state) => state.productReducer.product);
  const categories = useSelector((state) => state.categoryReducer.categories);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
  }, []);

  const [open, setOpen] = useState(false);

  const [id, setId] = useState();
  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(disableProduct(id));
    handleClose();
  };

  useEffect(() => {
    setRows(products.allProducts);
  }, [content]);

  useEffect(() => {
    if (products) {
      let result = [];
      products.allProducts.forEach((product) => {
        result.push(product);
      });
      setContent(result);
    }
  }, [products, setContent]);

  const handleSearchProduct = (searchValue) => {
    const filteredRows = content.filter((row) => {
      return row.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setRows(filteredRows);
  };

  const filterStatus = (array) => {
    if (status === "All") {
      return array;
    } else {
      return array.filter(
        (item) => item.status.toLowerCase() === status.toLowerCase()
      );
    }
  };

  const filterCategory = (array) => {
    if (category === "All") {
      return array;
    } else {
      return array.filter((item) => item.category.name === category);
    }
  };

  useEffect(() => {
    let result = products.allProducts;
    window.setTimeout(() => {
      result = filterCategory(result);
      result = filterStatus(result);
      setRows(result);
    }, 100);
  }, [category, status]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                // handleViewDetail(params.row.id);
                navigate(`/owner/products/${params.row.id}`);
              }}
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => {
                handleClickOpen(params.row.id);
              }}
            >
              Disable
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar search={handleSearchProduct} />
        <div className="datatable">
          <div className="datatableTitle">
            Product Management
            <Button
              variant="outlined"
              onClick={() => {
                setOpenDialog(true);
                // navigate("/owner/products/new");
              }}
            >
              New Product
            </Button>
          </div>
          <Stack
            direction="row"
            justifyContent="center"
            // style={{marginRight: "125px"}}
            alignItems="center"
            spacing={5}
            m={2}
          >
            <Box sx={{ width: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size="small">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  size="small"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {categories.map((item) => (
                    <MenuItem value={item.name}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ width: 200 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size="small">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                  size="small"
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"Available"}>Available</MenuItem>
                  <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <DataGrid
            className="datagrid"
            sx={{ width: "80%", margin: "auto" }}
            rows={rows}
            columns={productColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm disable?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to disable this product?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleAgree}>Agree</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
      <NewProduct openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default TableProduct;
