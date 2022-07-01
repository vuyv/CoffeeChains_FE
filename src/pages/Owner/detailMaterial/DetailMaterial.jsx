import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMaterial from "./NewMaterial";
import { getMaterials } from "../../../redux/actions/materialAction";
import CardMaterial from "./CardMaterial";
import { getAllUnits } from "../../../redux/actions/unitAction";
import TablePagination from "@mui/material/TablePagination";

const DetailMaterial = () => {
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    dispatch(getMaterials());
    dispatch(getAllUnits());
  }, []);

  const materials = useSelector((state) => state.materialReducer.materials);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="category">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="datatable">
          <div className="datatableTitle">
            Material Management
            <Button variant="outlined" onClick={handleClickOpen}>
              New Material
            </Button>
          </div>
          <div
            className="widgets"
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
          >
            {materials
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <CardMaterial key={index} item={item} />
              ))}
          </div>
          <TablePagination
            rowsPerPageOptions={[12]}
            component="div"
            count={materials.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </div>
      </div>
      <NewMaterial openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default DetailMaterial;
