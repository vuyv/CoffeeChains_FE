import CartItem from "../cartItem/CartItem";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, React } from "react";
import Select from "react-select";
import { loadHappeningDiscounts } from "../../redux/actions/discountAction";
import { applyDiscount, clearCart } from "../../redux/actions/cartAction";
import Button from "@mui/material/Button";

function Cart(props) {
  const cartItemsRedux = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHappeningDiscounts());
  }, []);

  const happeningDiscounts = useSelector(
    (state) => state.discountReducer.happeningDiscounts
  );

  const discountList = happeningDiscounts.map((item) => {
    return {
      label: item.title,
      value: item.code,
      percent: item.percent,
    };
  });
  const [hasDiscount, setHasDiscount] = useState(false);

  return (
    <div className="wrapCard">
      <h2>Order</h2>

      {cartItemsRedux.cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : null}
      {cartItemsRedux.cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      {cartItemsRedux.cartItems.length !== 0 && (
        <div>
          <div className="discount">
            <h5 className="title">Discount code</h5>
            <Select
              options={discountList}
              onChange={(value) => {
                setHasDiscount(true);
                dispatch(applyDiscount(value.percent));
              }}
            />
          </div>
          <div className="subTotal">
            <h5 className="title">Subtotal</h5>
            <h5> ${cartItemsRedux.total}</h5>
          </div>

          {hasDiscount && (
            <div>
              <div className="discountSave">
                <h5 className="title">Discount</h5>
                <h5>$-{cartItemsRedux.discountSave}</h5>
              </div>
              <div className="total">
                <h5 className="title">Total</h5>
                <h5> ${cartItemsRedux.totalApplyDiscount}</h5>
              </div>
            </div>
          )}
          <div className="buttonsCheckout">
            <Button
              size="big"
              disableElevation
              variant="outlined"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </Button>
            <Button
              size="big"
              disableElevation
              variant="contained"
              // onClick={() => dispatch(decreaseQuantity(item))}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
