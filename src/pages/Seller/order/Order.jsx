import React, {useState} from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Box
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ProductCard from "../../../components/Cards/productCard.component"
import AddNew from "../../../components/Cards/addNewCard.component";
import RightForm from "../../../components/Forms/rightForm.component";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverage";
import { makeStyles } from "@material-ui/core/styles";
import CakeIcon from "@material-ui/icons/Cake";
import { productPageStyles } from "./productPage.styles";
import { rightDrawerWidth } from "../../../style/theme";
import { PRODUCTS } from "../../../data/products";

const useStyles = makeStyles(productPageStyles);

const Order = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: ""
  });
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <Box className={classes.container}>
          <div
            style={{ marginRight: `${open ? `${rightDrawerWidth}px` : "0"}` }}
          >
              <ExpansionPanelSummary >
                <EmojiFoodBeverageIcon fontSize="large" color="primary" />
                <Typography variant="h5">&nbsp; Hot Drinks</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>

                <Grid container spacing={3}>
                  {PRODUCTS.drinks.map((item, id) => (
                    <Grid item xs={12} sm={6} md={3} key={id}>
                      <ProductCard
                        item={item}
                        openForm={() => {
                          setOpen(true);
                          setData({
                            ...data,
                            name: item.name,
                            price: item.price,
                          });
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </ExpansionPanelDetails>
            
              <ExpansionPanelSummary>
                <CakeIcon fontSize="large" color="primary" />
                <Typography variant="h5">&nbsp; Cakes</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={3}>
                  {PRODUCTS.cakes.map((item, id) => (
                    <Grid item xs={12} sm={6} md={3} key={id}>
                      <ProductCard
                        item={item}
                        openForm={() => {
                          setOpen(true);
                          setData({
                            ...data,
                            name: item.name,
                            price: item.price,
                          });
                        }}
                      />
                    </Grid>
                  ))}

                </Grid>
                
              </ExpansionPanelDetails>
          </div>
          {/* <RightForm
            open={open}
            handleClose={() => setOpen(false)}
            data={data}
          /> */}
        </Box>
      </div>
    </div>
  );
};

export default Order;
