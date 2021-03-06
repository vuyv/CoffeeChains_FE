const initialState = {
  productsByCategory: [],
  allProducts: [],
  newProduct: {},
  activeProductsByCategory: [],
  activeProducts: [],
  estimateProducts: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };
    case "CREATE_PRODUCT":
      return {
        ...state,
        newProduct: action.payload,
      };
    case "GET_PRODUCT_BY_ID":
      return {
        ...state,
        product: action.payload,
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "DISABLE_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "GET_PRODUCT_BY_CATEGORY":
      return {
        ...state,
        productsByCategory: action.payload,
      };

    case "GET_ACTIVE_PRODUCT_BY_CATEGORY":
      return {
        ...state,
        activeProductsByCategory: action.payload,
      };
    case "GET_ACTIVE_PRODUCTS":
      return {
        ...state,
        activeProducts: action.payload,
      };
    case "ESTIMATE_PRODUCTS":
      return {
        ...state,
        estimateProducts: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
