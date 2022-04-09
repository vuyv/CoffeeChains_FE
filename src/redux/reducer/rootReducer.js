import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import roleReducer from "./roleReducer";
import branchReducer from "./branchReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
import discountReducer from "./discountReducer"
import orderReducer from './orderReducer';
const rootReducer = combineReducers({
  authReducer,
  employeeReducer,
  branchReducer,
  roleReducer,
  imageReducer,
  categoryReducer,
  productReducer,
  discountReducer,
  orderReducer
});

export default rootReducer;
