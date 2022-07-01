import OwnerHome from "./pages/Owner/home/Home";
import Login from "./pages/login/Login";
import TableEmployee from "./pages/Owner/employee/tableEmployee/TableEmployee";
import DetailEmployee from "./pages/Owner/employee/detailEmployee/Detail";
import CreateEmployee from "./pages/Owner/employee/createEmployee/CreateEmployee";
import TableProduct from "./pages/Owner/product/tableProduct/TableProduct";
import DetailProduct from "./pages/Owner/product/detailProduct/DetailProduct";
import CreateProduct from "./pages/Owner/product/createProduct/CreateProduct";
import Branch from "./pages/Owner/branch/Branch";
import DetailDiscount from "./pages/Owner/discount/detail/DetailDiscount";
import DiscountHome from "./pages/Owner/discount/home/DiscountHome";
import CreateDiscount from "./pages/Owner/discount/create/CreateDiscount";
import ManagerHome from "./pages/Manager/home/Home";
import EmployeeTable from "./pages/Manager/employee/tableEmployee/EmployeeTable";
import CreateEmployeeInBranch from "./pages/Manager/employee/createEmployee/CreateEmployeeInBranch";
import EmployeeDetail from "./pages/Manager/employee/detailEmployee/EmployeeDetail";
import ProfileSeller from "./pages/Seller/profile/Profile";
import ProfileManager from "./pages/Manager/profile/ProfileManager";
import BranchDetail from "./pages/Owner/branch/detail/BranchDetail";
import ProfileOwner from "./pages/Owner/profile/Profile";
import Order from "./pages/Seller/order/Order";
import FindOrder from "./pages/Seller/order/FindOrder";
import HappeningDiscount from "./pages/Seller/discount/Discount";
import ViewDiscount from "./pages/Manager/discount/ViewDiscount";
import ViewOrder from "./pages/Manager/order/ViewOrder";
import OrderDetail from "./pages/Manager/order/OrderDetail";
import ProductDetail from "./pages/Owner/product/detailProduct/ProductDetail";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  useRoutes,
  Navigate,
  useLocation,
} from "react-router-dom";
import PhoneNumber from "./pages/Forgot Password/PhoneNumber";
import VerifyCode from "./pages/Forgot Password/VerifyCode";
import ResetPassword from "./pages/Forgot Password/ResetPassword";
import ReportOfOwner from "./pages/Owner/report/Report";
import ReportOfManager from "./pages/Manager/report/Report";
import Bill from "./pages/Seller/order/Bill";
import Category from "./pages/Owner/category/Category";
import MaterialTable from "./pages/Manager/material/viewMaterial/MaterialTable";
import CreateMaterial from "./pages/Manager/material/createMaterial/CreateMaterial";
import ExportMaterial from "./pages/Manager/material/ExportMaterial/ExportMaterial";
import ImportHistory from "./pages/Manager/material/history/ImportHistory";
import ExportHistory from "./pages/Manager/material/history/ExportHistory";
import HomePage from "./pages/homepage/Homepage";
import DetailMaterial from "./pages/Owner/detailMaterial/DetailMaterial";

const RouteOwner = () => {
  let route = useRoutes([
    {
      path: "/owner",
      children: [
        { path: "", element: <OwnerHome /> },
        { path: "profile", element: <ProfileOwner /> },
        {
          path: "employees",
          children: [
            { path: "", element: <TableEmployee /> },
            { path: ":employeeId", element: <DetailEmployee /> },
            { path: "new", element: <CreateEmployee /> },
          ],
        },
        {
          path: "branch",
          children: [
            { path: "", element: <Branch /> },
            { path: ":branchId", element: <BranchDetail /> },
          ],
        },
        {
          path: "category",
          element: <Category />,
        },
        {
          path: "products",
          children: [
            { path: "", element: <TableProduct /> },
            { path: ":productId", element: <DetailProduct /> },
            // { path: ":productId", element: <ProductDetail /> },
            // { path: "new", element: <CreateProduct /> },
          ],
        },
        {
          path: "discounts",
          children: [
            { path: "", element: <DiscountHome /> },
            { path: ":discountCode", element: <DetailDiscount /> },
            { path: "new", element: <CreateDiscount /> },
          ],
        },
        {
          path: "report",
          element: <ReportOfOwner />,
        },
        {
          path: "materials",
          children: [{ path: "", element: <DetailMaterial /> }],
        },
      ],
    },
  ]);
  return route;
};

const RouteManager = () => {
  let route = useRoutes([
    {
      path: "/manager",
      children: [
        { path: "", element: <ManagerHome /> },
        { path: "profile", element: <ProfileManager /> },
        {
          path: "employees",
          children: [
            { path: "", element: <EmployeeTable /> },
            { path: ":employeeId", element: <EmployeeDetail /> },
            { path: "new", element: <CreateEmployeeInBranch /> },
          ],
        },
        { path: "discounts", element: <ViewDiscount /> },
        {
          path: "orders",
          children: [
            { path: "", element: <ViewOrder /> },
            { path: ":orderId", element: <OrderDetail /> },
          ],
        },
        {
          path: "report",
          element: <ReportOfManager />,
        },
        {
          path: "materials",
          children: [
            { path: "inventory", element: <MaterialTable /> },
            { path: "import", element: <CreateMaterial /> },
            { path: "export", element: <ExportMaterial /> },
            { path: "import_history", element: <ImportHistory /> },
            { path: "export_history", element: <ExportHistory /> },
          ],
        },
      ],
    },
  ]);
  return route;
};

const RouteSeller = () => {
  let route = useRoutes([
    {
      path: "/seller",
      children: [
        { path: "", element: <Order /> },
        { path: "profile", element: <ProfileSeller /> },
        {
          path: "orders",
          children: [
            { path: ":orderId", element: <FindOrder /> },
            { path: "new", element: <Bill /> },
          ],
        },
        { path: "discounts", element: <HappeningDiscount /> },
      ],
    },
  ]);
  return route;
};

function App() {
  const auth = useSelector((state) => state.authReducer);
  const user = JSON.parse(localStorage.getItem("current_user"));

  const RequireAuth = ({ redirectTo }) => {
    let location = useLocation();

    if (auth.role === "OWNER") {
      return <RouteOwner />;
    } else if (auth.role === "MANAGER") {
      return <RouteManager />;
    } else if (auth.role === "SELLER") {
      return <RouteSeller />;
    }
    if (user.role.name === "OWNER" && location.pathname.startsWith("/owner")) {
      return <RouteOwner />;
    } else if (
      user.role.name === "MANAGER" &&
      location.pathname.startsWith("/manager")
    ) {
      return <RouteManager />;
    } else if (
      user.role.name === "SELLER" &&
      location.pathname.startsWith("/seller")
    ) {
      return <RouteSeller />;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("current_user");
      return <Navigate to={redirectTo} state={{ from: location }} />;
    }
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot_password" element={<PhoneNumber />} />
            <Route path="verify_code" element={<VerifyCode />} />
            <Route path="reset_password" element={<ResetPassword />} />
            <Route path="*" element={<RequireAuth redirectTo="/login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
