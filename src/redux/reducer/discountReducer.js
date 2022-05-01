import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  discounts: [],
  upcomingDiscounts: [],
  happeningDiscounts: [],
  expiredDiscounts: [],
  statusDiscounts: [],
  discount: {},
  deleteSuccess: false,
};

const discountReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_DISCOUNTS":
      return {
        ...state,
        discounts: action.payload,
      };
      
    case "GET_UPCOMING_DISCOUNTS":
      return {
        ...state,
        upcomingDiscounts: action.payload,
      };
    case "GET_HAPPENING_DISCOUNTS":
      return {
        ...state,
        happeningDiscounts: action.payload,
      };
    case "GET_EXPIRED_DISCOUNTS":
      return {
        ...state,
        expiredDiscounts: action.payload,
      };
    case "UPDATE_DISCOUNT":
      return {
        ...state,
        discount: action.payload,
      };
    case "CREATE_DISCOUNT":
      return {
        ...state,
        discount: action.payload,
      };
    case "DELETE_DISCOUNT":
      return {
        ...state,
        deleteSuccess: true,
      };
    default:
      return state;
  }
};

export default discountReducer;
