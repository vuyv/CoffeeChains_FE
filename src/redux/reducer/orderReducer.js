const initialState = {
  orders: [],
  ordersInBranch: [],
  order: {},
  cancel: false,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDERS":
      return {
        ...state,
        orders: action.payload,
      };
    case "GET_ORDER_BY_ID":
      return {
        ...state,
        order: action.payload,
      };
    case "GET_ORDERS_IN_BRANCH":
      return {
        ...state,
        ordersInBranch: action.payload,
      };
    case "GET_ORDER_BY_ID_IN_BRANCH":
      return {
        ...state,
        order: action.payload,
      };
    case "CANCEL_ORDER":
      return {
        ...state,
        order: action.payload,
      };
      case "REMOVE_ORDER":
      return {
        ...state,
        order: null,
      };
    default:
      return state;
  }
};

export default orderReducer;
