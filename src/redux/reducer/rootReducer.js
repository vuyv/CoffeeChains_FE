import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import roleReducer from "./roleReducer";
import branchReducer from "./branchReducer";
import imageReducer from "./imageReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";
<<<<<<< HEAD
import discountReducer from "./discountReducer";
import cartReducer from "./cartReducer";
=======
import discountReducer from "./discountReducer"
import orderReducer from './orderReducer';
>>>>>>> e085ffe27b03ec82f6f1b0053065c50195bd3887
const rootReducer = combineReducers({
  authReducer,
  employeeReducer,
  branchReducer,
  roleReducer,
  imageReducer,
  categoryReducer,
  productReducer,
  discountReducer,
<<<<<<< HEAD
  cartReducer,
=======
  orderReducer
>>>>>>> e085ffe27b03ec82f6f1b0053065c50195bd3887
});

export default rootReducer;
