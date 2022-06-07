import StoreIcon from "@mui/icons-material/Store";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./cardCategory.scss";
import { updateCategory } from "./../../../redux/actions/categoryAction";
import { loadProductByCategory } from "./../../../redux/actions/productAction";
import { TableContainer } from "@mui/material";

const CardCategory = (props) => {
  const { item } = props;
  const navigate = useNavigate();

  const [name, setName] = useState(item.name);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const products = useSelector(
    (state) => state.productReducer.productsByCategory
  );

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(loadProductByCategory(item.id));
  };

  const handleClose = () => {
    window.setTimeout(() => {
      setOpen(false);
    }, 20);
    setDisable(true);
  };

  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateCategory(name, item.id));
    setDisable(true);
    handleClose();
  };

  return (
    <div
      className="widget col-3"
      id="cardCategory"
      onClick={handleClickOpen}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className="left">
        <span className="title">
          <i>CATEGORY</i>
        </span>
        <span className="counter">{item.name}</span>
      </div>
      <Dialog open={open} onClose={handleClose} maxWidth="xs">
        <DialogTitle
          sx={{
            display: "flex",
            "line-height": "2.0",
            "justify-content": "space-between",
            fontSize: "1.5rem",
            // backgroundImage: `url(${item.image})`,
            // backgroundSize: "cover",
            // backgroundPosition: "center"
          }}
        >
          {disable == true && name}
          {disable === false && (
            <TextField
              margin="dense"
              id="name"
              autoFocus
              type="name"
              size="small"
              // sx={{ marginLeft: "15px" }}
              value={name}
              variant="standard"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {disable === true && (
            <Button
              sx={{ marginLeft: "20px" }}
              onClick={() => {
                setDisable(false);
              }}
            >
              Edit
            </Button>
          )}
          {disable === false && (
            <Button sx={{ marginLeft: "20px" }} onClick={handleUpdate}>
              Save
            </Button>
          )}
        </DialogTitle>
        <DialogContent scroll={"paper"}>
          <TableContainer sx={{ minWidth: 340, maxHeight: 440 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="right">
                      ${product.price.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate("/owner/products/new")}>
            Add new product
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardCategory;
