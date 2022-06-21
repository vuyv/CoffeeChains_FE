import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllDiscounts,
  loadExpiredDiscounts,
  loadHappeningDiscounts,
  loadUpcomingDiscounts
} from "../../../redux/actions/discountAction";
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar";
import { DataGrid } from "@mui/x-data-grid";
import { discountColumns } from "../../../datatablesource"
import { Tabs, Tab } from "@material-ui/core";

function ViewDiscount() {

  const upcomingDiscounts = useSelector(
    (state) => state.discountReducer.upcomingDiscounts
  );
  const happeningDiscounts = useSelector(
    (state) => state.discountReducer.happeningDiscounts
  );
  const expiredDiscounts = useSelector(
    (state) => state.discountReducer.expiredDiscounts
  );
    
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllDiscounts());
    dispatch(loadUpcomingDiscounts());
    dispatch(loadHappeningDiscounts());
    dispatch(loadExpiredDiscounts());
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Promotion List
          </div>

          <Tabs value={selectedTab} onChange={handleChangeTab}>
            <Tab label="upcoming"></Tab>
            <Tab label="happening"></Tab>
            <Tab label="expired"></Tab>
          </Tabs>

          {selectedTab === 0 && (
            <DataGrid
              className="datagrid"
              rows={upcomingDiscounts}
              columns={discountColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.code}
            />
          )}
          {selectedTab === 1 && (
            <DataGrid
              className="datagrid"
              rows={happeningDiscounts}
              columns={discountColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.code}
            />
          )}
          {selectedTab === 2 && (
            <DataGrid
              className="datagrid"
              rows={expiredDiscounts}
              columns={discountColumns}
              pageSize={9}
              rowsPerPageOptions={[9]}
              getRowId={(row) => row.code}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDiscount;
