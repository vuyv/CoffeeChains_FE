import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMaterial from "./NewMaterial";
import { getMaterials } from "../../../redux/actions/materialAction";
import CardMaterial from "./CardMaterial";
import { getAllUnits } from "../../../redux/actions/unitAction";

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
          <div className="widgets">
            {materials.map((item, index) => (
              <CardMaterial key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <NewMaterial openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </div>
  );
};

export default DetailMaterial;
