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

const useStyles = makeStyles(productCardStyles);

const ProductCard = (props) => {
  const classes = useStyles();
  const { item, handleAddToCart } = props;

  const dispatch = useDispatch();
  const handleAddToCart2 = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.name}
          onClick={() => {
            handleAddToCart2(item);
          }}
        />
        <CardContent className={classes.productName}>
          <Typography gutterBottom variant="h6" component="h2">
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions className={classes.actions}>
        <Tooltip title={"Price per unit"}>
          <Button color="primary">
            <Typography gutterBottom variant="h6" component="h2">
              {"$" + item.price}
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
