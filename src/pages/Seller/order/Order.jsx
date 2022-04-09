import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { useState, useEffect, React } from "react";
import { Grid, Box } from "@material-ui/core";
import ProductCard from "../../../components/Cards/productCard.component";
import { makeStyles } from "@material-ui/core/styles";
import { productPageStyles } from "./productPage.styles";
import { loadProductByCategory } from "../../../redux/actions/productAction";
import Cart from "../../../components/cart/Cart";
import Drawer from "@mui/material/Drawer";

const useStyles = makeStyles(productPageStyles);

const Order = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const callbackFunction = (childData) => {
    setCartOpen(childData);
  };

  const productList = useSelector((state) => state.productReducer.products);

  useEffect(() => {
    dispatch(loadProductByCategory(1));
  }, [dispatch]);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const getTotalItems = (items) => {
    return items.reduce((ack, item) => {
      return ack + item.amount;
    }, 0);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar parentCallback={callbackFunction} />
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart cartItems={cartItems} />
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
