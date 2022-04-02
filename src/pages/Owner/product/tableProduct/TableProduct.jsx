// import "./TableEmployee.scss";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";
import DataTable from "../../../../components/datatable/DataTable";
import { Link } from "react-router-dom";

const TableProduct = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {/* <BTable/> */}
        <Link to="/products/new" className="link">
          Add New
        </Link>
      </div>
    </div>
  );
};

export default TableProduct;
