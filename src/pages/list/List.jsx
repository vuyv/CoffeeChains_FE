import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataTable from "../../components/datatable/DataTable"
import BTable from "../../components/table/Table"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <BTable/> */}
        <DataTable/>
      </div>
    </div>
  )
}

export default List