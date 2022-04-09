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
        <h4>{item.name}</h4>
        <div className="information">
          <p>Price: ${item.price}</p>
          <p>Subtotal: ${item.quantity * item.price}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(decreaseQuantity(item))}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(addToCart(item))}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.name} />
      <button className="remove" onClick={() => handleRemoveFromCart(item)}>
        <i>Remove</i>
      </button>
    </div>
  );
}

export default CartItem;
