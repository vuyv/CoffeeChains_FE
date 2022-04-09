import React from "react";
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
  Input,
} from "@material-ui/core";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfastOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const useStyles = makeStyles(productCardStyles);

const ProductCard = ({ item, openForm, ...otherProps }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title={item.name}
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
          <Button size="large" color="primary">
            {/* <FreeBreakfastOutlinedIcon /> */}
            <Typography gutterBottom variant="h5" component="h2">
            {item.price / 1000 + ".000"}
            </Typography>
            {/* &nbsp; {item.price / 1000 + ".000"} */}
          </Button>
        </Tooltip>
        {/* <Tooltip title={""}>
          <Button size="large" color="primary" className={classes.quantity}>
            <RemoveCircleOutlineIcon size="large" />
            <span>0</span>
            <AddCircleOutlineIcon />
          </Button>
        </Tooltip> */}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
