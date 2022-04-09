import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadHappeningDiscounts} from "../../../redux/actions/discountAction";
import Sidebar from "../sidebar/Sidebar"
import Navbar from "../navbar/Navbar";

import { DataGrid } from "@mui/x-data-grid";
import { discountColumns } from "../../../datatablesource";

function Discount() {
    const dispatch = useDispatch();

    const happeningDiscounts = useSelector(
        (state) => state.discountReducer.happeningDiscounts
    );

    useEffect(() => {
        dispatch(loadHappeningDiscounts());
    }, []);

    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <div className="datatable">
                    <div className="datatableTitle">
                        Happening Discounts
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={happeningDiscounts}
                        columns={discountColumns}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        getRowId={(row) => row.code}
                    />
                </div>
            </div>
        </div>
    );
}

export default Discount;
