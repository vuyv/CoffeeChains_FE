import React from "react";
import Button from "@mui/material/Button";
import "./cartItem.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  decreaseQuantity,
} from "../../redux/actions/cartAction";

function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <div className="wrap">
      <div>
        <h4>{item.product.name}</h4>
        <div className="information">
          <p>Price: ${item.product.price.toFixed(2)}</p>
          <p>Subtotal: ${(item.quantity * item.product.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(decreaseQuantity(item.product))}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(addToCart(item.product))}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.product.image} />
      <button
        className="remove"
        onClick={() => handleRemoveFromCart(item.product)}
      >
        <i>Remove</i>
      </button>
    </div>
  );
}

export default CartItem;
