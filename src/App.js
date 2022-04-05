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

import DiscountHome from "./pages/Owner/discount/home/DiscountHome";

import ManagerHome from "./pages/Manager/home/Home";
import EmployeeTable from "./pages/Manager/employee/tableEmployee/EmployeeTable";
import CreateEmployeeInBranch from "./pages/Manager/employee/createEmployee/CreateEmployeeInBranch";
import EmployeeDetail from "./pages/Manager/employee/detailEmployee/EmployeeDetail";
import Profile from "./pages/Seller/profile/Profile";

import Order from "./pages/Seller/order/Order";

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
              </Route>
            </Route>

            <Route path="manager">
              <Route index element={<ManagerHome />} />
              <Route path="employees">
                <Route index element={<EmployeeTable />} />
                <Route path=":employeeId" element={<EmployeeDetail />} />
                <Route path="new" element={<CreateEmployeeInBranch />} />
              </Route>
            </Route>

            <Route path="seller">
              <Route index element={<Order />} />
              <Route path="orders" element={<Order />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
