import OwnerHome from "./pages/Owner/home/Home";
import Login from "./pages/login/Login";
import TableEmployee from "./pages/Owner/employee/tableEmployee/TableEmployee";
import DetailEmployee from "./pages/Owner/employee/detailEmployee/Detail";
import CreateEmployee from "./pages/Owner/employee/createEmployee/CreateEmployee";
import TableProduct from "./pages/Owner/product/tableProduct/TableProduct";
import DetailProduct from "./pages/Owner/product/detailProduct/DetailProduct";
import CreateProduct from "./pages/Owner/product/createProduct/CreateProduct";
import Branch from "./pages/Owner/branch/Branch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailDiscount from "./pages/Owner/discount/detail/DetailDiscount";
import DiscountHome from "./pages/Owner/discount/home/DiscountHome";
import CreateDiscount from "./pages/Owner/discount/create/CreateDiscount";
import ManagerHome from "./pages/Manager/home/Home";
import EmployeeTable from "./pages/Manager/employee/tableEmployee/EmployeeTable";
import CreateEmployeeInBranch from "./pages/Manager/employee/createEmployee/CreateEmployeeInBranch";
import EmployeeDetail from "./pages/Manager/employee/detailEmployee/EmployeeDetail";
import Profile from "./pages/Seller/profile/Profile";
import Order from "./pages/Seller/order/Order";
import FindOrder from "./pages/Seller/order/FindOrder";
import HappeningDiscount from "./pages/Seller/discount/Discount";
import ViewDiscount from "./pages/Manager/discount/ViewDiscount";
import ViewOrder from "./pages/Manager/order/ViewOrder";
import OrderDetail from "./pages/Manager/order/OrderDetail";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />

            <Route path="owner">
              <Route index element={<OwnerHome />} />

              <Route path="employees">
                <Route index element={<TableEmployee />} />
                <Route path=":employeeId" element={<DetailEmployee />} />
                <Route path="new" element={<CreateEmployee />} />
              </Route>

              <Route path="branch">
                <Route index element={<Branch />} />
              </Route>

              <Route path="products">
                <Route index element={<TableProduct />} />
                <Route path=":productId" element={<DetailProduct />} />
                <Route path="new" element={<CreateProduct />} />
              </Route>

              <Route path="discounts">
                <Route index element={<DiscountHome />} />
                <Route path=":discountCode" element={<DetailDiscount />} />
                <Route path="new" element={<CreateDiscount />} />
              </Route>
            </Route>

            <Route path="manager">
              <Route index element={<ManagerHome />} />
              <Route path="employees">
                <Route index element={<EmployeeTable />} />
                <Route path=":employeeId" element={<EmployeeDetail />} />
                <Route path="new" element={<CreateEmployeeInBranch />} />
              </Route>
              <Route path="discounts" element={<ViewDiscount />} />
              <Route path="orders">
                <Route index element={<ViewOrder />} />
                <Route path=":orderId" element={<OrderDetail />} />
              </Route>
            </Route>

            <Route path="seller">
              <Route index element={<Order />} />
              <Route path="orders">
                <Route path=":branchId">
                  <Route path=":orderId" element={<FindOrder />} />
                </Route>
              </Route>
              <Route path="discounts" element={<HappeningDiscount />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
