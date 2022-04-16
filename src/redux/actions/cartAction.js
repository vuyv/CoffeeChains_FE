export const addToCart = (item) => {
  return function (dispatch) {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  };
};

export const removeFromCart = (item) => {
  return function (dispatch) {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item,
    });
  };
};

export const clearCart = () => {
  return function (dispatch) {
    dispatch({
      type: "CLEAR_CART",
    });
  };
};

export const increaseQuantity = (item) => {
  return function (dispatch) {
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: item,
    });
  };
};

export const decreaseQuantity = (item) => {
  return function (dispatch) {
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: item,
    });
  };
};

export const applyDiscount = (discount) => {
  return function (dispatch) {
    dispatch({
      type: "APPLY_DISCOUNT",
      payload: discount,
    });
  };
};

export const createOrder = (percent) => {
  return function (dispatch) {
    dispatch({
      type: "APPLY_DISCOUNT",
      payload: percent,
    });
  };
};

