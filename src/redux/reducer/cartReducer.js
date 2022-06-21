const initialState = {
  cartItems: [],
  total: 0,
  totalQuantity: 0,
  appliedDiscountTotal: 0,
  discountSave: 0,
  hasDiscount: false,
  discountPercent: 0,
  discountCode: "",
};

function naiveRound(num, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  return Math.round(num * p) / p;
}

function round(num) {
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

const calculateDiscountSave = (total, percent) => {
  // return (total * percent) / 100;
  return ((total * percent) / 100).toFixed(2);
};

const calculateAppliedDiscountTotal = (total, discountSave) => {
  let temp = (total - discountSave);
  return round(temp);
  // return (total - discountSave).toFixed(2);
};

const calculateTotal = (cartItems) => {
  // return cartItems.reduce(
  //   (acc, item) => acc + item.quantity * item.product.price,
  //   0
  // ).toFixed(2);

  return cartItems
    .reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    .toFixed(2);
};

const calculateQuantity = (cartItems) => {
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      {
        const itemIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.id
        );

        const updatedState = { ...state };
        if (itemIndex >= 0) {
          updatedState.cartItems[itemIndex].quantity += 1;

          updatedState.total = calculateTotal(updatedState.cartItems);
          updatedState.totalQuantity = calculateQuantity(
            updatedState.cartItems
          );

          updatedState.appliedDiscountTotal = updatedState.total;

          if (updatedState.hasDiscount) {
            updatedState.discountSave = calculateDiscountSave(
              updatedState.total,
              updatedState.discountPercent
            );
            updatedState.appliedDiscountTotal = calculateAppliedDiscountTotal(
              updatedState.total,
              updatedState.discountSave
            );
          }

          return updatedState;
        }

        const newItem = { product: action.payload, quantity: 1 };
        updatedState.cartItems.push(newItem);
        localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedState.cartItems)
        );

        updatedState.total = calculateTotal(updatedState.cartItems);
        updatedState.totalQuantity = calculateQuantity(updatedState.cartItems);
        updatedState.appliedDiscountTotal = updatedState.total;

        return updatedState;
      }
      break;

    case "REMOVE_FROM_CART":
      {
        const updatedState = { ...state };

        const nextCartItems = updatedState.cartItems.filter(
          (item) => item.product.id !== action.payload.id
        );

        updatedState.cartItems = nextCartItems;
        updatedState.total = calculateTotal(updatedState.cartItems);
        updatedState.totalQuantity = calculateQuantity(updatedState.cartItems);
        updatedState.appliedDiscountTotal = updatedState.total;

        if (updatedState.hasDiscount) {
          updatedState.discountSave = calculateDiscountSave(
            updatedState.total,
            updatedState.discountPercent
          );
          updatedState.appliedDiscountTotal = calculateAppliedDiscountTotal(
            updatedState.total,
            updatedState.discountSave
          );
        }

        return updatedState;
      }
      break;

    case "DECREASE_QUANTITY":
      {
        const reducerItemIndex = state.cartItems.findIndex(
          (item) => item.product.id === action.payload.id
        );
        const updatedState = { ...state };

        if (state.cartItems[reducerItemIndex].quantity > 1) {
          updatedState.cartItems[reducerItemIndex].quantity -= 1;

          updatedState.total = calculateTotal(updatedState.cartItems);
          updatedState.totalQuantity = calculateQuantity(
            updatedState.cartItems
          );
          updatedState.appliedDiscountTotal = updatedState.total;

          if (updatedState.hasDiscount) {
            updatedState.discountSave = calculateDiscountSave(
              updatedState.total,
              updatedState.discountPercent
            );
            updatedState.appliedDiscountTotal = calculateAppliedDiscountTotal(
              updatedState.total,
              updatedState.discountSave
            );
          }
          return updatedState;
        } else if (state.cartItems[reducerItemIndex].quantity === 1) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.product.id !== action.payload.id
          );
          updatedState.cartItems = nextCartItems;

          updatedState.total = calculateTotal(updatedState.cartItems);
          updatedState.totalQuantity = calculateQuantity(
            updatedState.cartItems
          );
          updatedState.appliedDiscountTotal = updatedState.total;

          if (updatedState.hasDiscount) {
            updatedState.discountSave = calculateDiscountSave(
              updatedState.total,
              updatedState.discountPercent
            );
            updatedState.appliedDiscountTotal = calculateAppliedDiscountTotal(
              updatedState.total,
              updatedState.discountSave
            );
          }
          return updatedState;
        }

        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
      break;
    case "CLEAR_CART": {
      return {
        cartItems: [],
        total: 0,
        totalQuantity: 0,
        appliedDiscountTotal: 0,
        discountSave: 0,
        discountCode: "",
      };
    }
    case "APPLY_DISCOUNT": {
      const updatedState = { ...state };
      updatedState.hasDiscount = true;
      updatedState.discountPercent = action.payload.percent;
      updatedState.discountCode = action.payload.value;

      updatedState.discountSave = calculateDiscountSave(
        updatedState.total,
        updatedState.discountPercent
      );
      updatedState.appliedDiscountTotal = calculateAppliedDiscountTotal(
        updatedState.total,
        updatedState.discountSave
      );

      return updatedState;
    }

    default:
      return state;
  }
};

export default cartReducer;
