import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const initialState = {
  branchs: [],
  branch: {},
};

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BRANCHS":
      return {
        ...state,
        branchs: action.payload,
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

export default branchReducer;
