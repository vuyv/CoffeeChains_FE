import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useState, useEffect, React, useRef } from "react";
import { Grid, Box } from "@material-ui/core";
import ProductCard from "../../../components/Cards/productCard.component";
import { makeStyles } from "@material-ui/core/styles";
import { productPageStyles } from "./productPage.styles";

import Cart from "../../../components/cart/Cart";
import Drawer from "@mui/material/Drawer";
import {
  loadActiveProductByCategory,
  loadActiveProducts,
} from "./../../../redux/actions/productAction";

const useStyles = makeStyles(productPageStyles);

const Order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const typingTimeOutRef = useRef(null);

  const callbackFunction = (childData) => {
    setCartOpen(childData);
  };

  const productListRedux = useSelector((state) => state.productReducer);
  const [productList, setProductList] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [content, setContent] = useState();
  const allProductsRedux = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(loadActiveProducts());
    dispatch(loadActiveProductByCategory(1));
  }, [dispatch]);

  useEffect(() => {
    if (productListRedux) {
      let result = [];
      productListRedux.activeProductsByCategory.forEach((product) => {
        result.push(product);
      });
      setProductList(result);
    }
  }, [productListRedux, setProductList]);

  useEffect(() => {
    if (allProductsRedux) {
      let result = [];
      productListRedux.activeProducts.forEach((product) => {
        result.push(product);
      });
      setContent(result);
    }
  }, [productListRedux, setContent]);

  const handleSearchProduct = (value) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    typingTimeOutRef.current = setTimeout(() => {
      setProductList(
        content.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }, 300);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar
          parentCallback={callbackFunction}
          search={handleSearchProduct}
        />
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart cartItems={cartItems} parentCallback={callbackFunction} />
        </Drawer>

        <Box className={classes.container}>
          <Grid container spacing={3}>
            {productList.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard item={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Order;
