import { combineReducers } from "redux";
import authReducer from "./authReducer";
import employeeReducer from "./employeeReducer";
import roleReducer from "./roleReducer";
import branchReducer from "./branchReducer";
import imageReducer from "./imageReducer";
const rootReducer = combineReducers({
  authReducer,
  employeeReducer,
  branchReducer,
  roleReducer,
  imageReducer,
});

export default rootReducer;
