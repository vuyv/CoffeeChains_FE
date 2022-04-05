import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  categories: [],
  category: {},
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        ...state,
        category: action.payload,
      };
    case "UPDATE_CATEGORY":
      toast.success("Update Successfully");
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
