import CartItem from "../cartItem/CartItem";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, React } from "react";
import Select from "react-select";
import { loadHappeningDiscounts } from "../../redux/actions/discountAction";
import { applyDiscount, clearCart } from "../../redux/actions/cartAction";
import Button from "@mui/material/Button";
import { createOrder, createFakeOrder } from "../../redux/actions/orderAction";
import { Navigate, useNavigate } from "react-router-dom";

function Cart(props) {
  const cartItemsRedux = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  //generate order
  const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var discountCode = ["wuJnyj", "KwLKum"];
  var code = discountCode[Math.floor(Math.random() * discountCode.length)];

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="wrapCard">
      <h2>Order</h2>

      {cartItemsRedux.cartItems.length === 0 ? (
        <p>No items in your cart</p>
      ) : null}
      {cartItemsRedux.cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      <div>
        <div className="discount">
          <h5 className="title">Discount code</h5>
          <Select
            options={discountList}
            onChange={(value) => {
              setHasDiscount(true);
              dispatch(applyDiscount(value));
            }}
          />
        </div>
        <div className="subTotal">
          <h5 className="title">Total</h5>
          <h5> {formatter.format(cartItemsRedux.total)}</h5>
        </div>
        <div>
          <div className="discountSave">
            <h5 className="title">Discount</h5>
            <h5> {formatter.format(cartItemsRedux.discountSave)}</h5>
          </div>
          <div className="total">
            <h5 className="title">Total</h5>
            <h5> {formatter.format(cartItemsRedux.appliedDiscountTotal)}</h5>
          </div>
        </div>
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
            onClick={() => {
              // for (let i = 1; i < 100; i++) {
              //   const cart = {
              //     discountCode: "",
              //     // discountCode[
              //     //   Math.floor(Math.random() * discountCode.length)
              //     // ],
              //     date: "2022-07-14",
              //     employeeId: 86,
              //     cartItems: [
              //       {
              //         quantity: getRandom(1, 4),
              //         product: {
              //           id: getRandom(1, 52),
              //         },
              //       },
              //       {
              //         quantity: getRandom(1, 5),
              //         product: {
              //           id: getRandom(1, 52),
              //         },
              //       },
              //     ],
              //   };
              //   dispatch(createFakeOrder(cart));
              // }

              dispatch(createOrder(cartItemsRedux));
              window.setTimeout(() => {
                props.parentCallback(false);
                dispatch(clearCart());
              }, 500);
              navigate("/seller/orders/new");
            }}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
