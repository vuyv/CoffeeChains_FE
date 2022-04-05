import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  discounts: [],
  upcomingDiscounts: [],
  happeningDiscounts: [],
  expiredDiscounts: [],
  discount: {},
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
    case "CREATE_BRANCHS":
      return {
        ...state,
        branch: action.payload,
      };
    case "UPDATE_BRANCHS":
      toast.success("Update Successfully");

      return {
        ...state,
        branch: action.payload,
      };
    default:
      return state;
  }
};

export default discountReducer;
