import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { productCardStyles } from "./productCard.styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Divider,
  Tooltip,
} from "@material-ui/core";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { addToCart } from "../../redux/actions/cartAction";
import { useState } from "react";

const useStyles = makeStyles(productCardStyles);

const ProductCard = (props) => {
  const classes = useStyles();
  const { item, handleAddToCart } = props;

  const dispatch = useDispatch();
  const handleAddToCart2 = (item) => {
    dispatch(addToCart(item));
  };

  const [isShown, setIsShown] = useState(false);

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.name}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => {
            handleAddToCart2(item);
          }}
        >
          {/* {isShown && (
            <div
              style={{
                color: "#fff",
                background: "rgba(128, 128, 128, 0.7)",
                height: 250,
                width: 287,
                fontSize: 22,
                lineHeight: "250px",
                textAlign: "center",
                position: "absolute",
              }}
            >
              <b
                style={{
                  zIndex: "1",
                  opacity: "inherited",
                  position: "relative",
                }}
              >
                AVAILABLE: {item.available}
              </b>
            </div>
          )} */}
        </CardMedia>
        <CardContent className={classes.productName}>
          <Typography gutterBottom variant="h6" component="h2">
            {item.name}
          </Typography>
          <Typography
            style={{ fontSize: "15px", marginTop: "-7px", marginLeft: "148px" }}
          >
            Available: <b style={{ color: "#3f51b5" }}>{item.available}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.actions}>
        <Tooltip title={"Price per unit"}>
          <Button color="primary">
            <i style={{ marginRight: "6px" }}>Price:</i>
            <Typography gutterBottom variant="h6" component="h2">
              {"$" + item.price.toFixed(2)}
            </Typography>
          </Button>
        </Tooltip>
        <Tooltip title={""}>
          <Button
            color="primary"
            style={{
              border: "1px solid",
              background: "#3f51b5",
              color: "white",
            }}
            onClick={() => {
              handleAddToCart2(item);
            }}
          >
            {/* <RemoveCircleOutlineIcon size="large" />
            <span>0</span>
            <AddCircleOutlineIcon /> */}
            Add to cart
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
