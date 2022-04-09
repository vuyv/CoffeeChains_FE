import { isFulfilled } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  totalQuantity: 0,
  totalApplyDiscount: 0,
  discountSave: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      {
        const itemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );

        const updatedState = { ...state };
        if (itemIndex >= 0) {
          updatedState.cartItems[itemIndex].quantity += 1;

          var totalTemp = updatedState.cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2);
          updatedState.total = totalTemp;

          var quantityTemp = updatedState.cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          updatedState.totalQuantity = quantityTemp;

          updatedState.discountSave = 0;
          updatedState.totalApplyDiscount = 0;
          return updatedState;
        }

        const newItem = { ...action.payload, quantity: 1 };
        updatedState.cartItems.push(newItem);
        localStorage.setItem(
          "cartItems",
          JSON.stringify(updatedState.cartItems)
        );

        var totalTemp = updatedState.cartItems
          .reduce((acc, item) => acc + item.quantity * item.price, 0)
          .toFixed(2);
        updatedState.total = totalTemp;

        var quantityTemp = updatedState.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        updatedState.totalQuantity = quantityTemp;

        return updatedState;
      }
      break;

    case "REMOVE_FROM_CART":
      {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );

        var totalTemp = nextCartItems
          .reduce((acc, item) => acc + item.quantity * item.price, 0)
          .toFixed(2);

        var quantityTemp = nextCartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        return {
          ...state,
          cartItems: nextCartItems,
          total: totalTemp,
          totalQuantity: quantityTemp,
        };
      }
      break;

    case "DECREASE_QUANTITY":
      {
        const reducerItemIndex = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        const updatedState = { ...state };

        if (state.cartItems[reducerItemIndex].quantity > 1) {
          updatedState.cartItems[reducerItemIndex].quantity -= 1;

          var totalTemp = updatedState.cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2);
          updatedState.total = totalTemp;

          var quantityTemp = updatedState.cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          updatedState.totalQuantity = quantityTemp;
          updatedState.discountSave = 0;
          updatedState.totalApplyDiscount = 0;
          return updatedState;
        } else if (state.cartItems[reducerItemIndex].quantity === 1) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
          updatedState.cartItems = nextCartItems;

          var totalTemp = updatedState.cartItems
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2);
          updatedState.total = totalTemp;

          var quantityTemp = updatedState.cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
          updatedState.discountSave = 0;
          updatedState.totalApplyDiscount = 0;
          updatedState.totalQuantity = quantityTemp;
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
        totalApplyDiscount: 0,
        discountSave: 0,
      };
    }
    case "APPLY_DISCOUNT": {
      const percent = action.payload;
      const updatedState = { ...state };

      const discountSave = (state.total * percent) / 100;
      updatedState.discountSave = discountSave.toFixed(2);

      updatedState.totalApplyDiscount = (
        updatedState.total - discountSave
      ).toFixed(2);

      return updatedState;
    }

    default:
      return state;
  }
};

export default cartReducer;
