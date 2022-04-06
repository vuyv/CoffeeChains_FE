import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import {
  Grid,
  Box,
} from "@material-ui/core";
import ProductCard from "../../../components/Cards/productCard.component";
import { makeStyles } from "@material-ui/core/styles";
import { productPageStyles } from "./productPage.styles";
import {
  loadProductByCategory,
} from "../../../redux/actions/productAction";


const useStyles = makeStyles(productPageStyles);

const Order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state)=> state.productReducer.products)

  useEffect(()=>{
    dispatch(loadProductByCategory(1));
  },[dispatch])

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <Box className={classes.container}>
          <Grid container spacing={3}>
            {productList.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard
                  item={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Order;
