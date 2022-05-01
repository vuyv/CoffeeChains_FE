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

import { updateCategory } from "./../../../redux/actions/categoryAction";
import { loadProductByCategory } from "./../../../redux/actions/productAction";

const CardCategory = (props) => {
  const { item } = props;

  const [backgroundColor, setBackgroundColor] = useState();
  const [logoColor, setLogoColor] = useState();
  const [name, setName] = useState(item.name);
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const products = useSelector(
    (state) => state.productReducer.productsByCategory
  );

  useEffect(() => {
    setBackgroundColor("rgba(0, 128, 0, 0.2)");
    setLogoColor("green");
  });

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
    setDisable(true)
    handleClose();
  };

  return (
    <div className="widget col-3" onClick={handleClickOpen}>
      <div className="left">
        <span className="title">CATEGORY</span>
        <span className="counter">{item.name}</span>
      </div>
      <div className="right">
        <CreditCardIcon
          className="icon"
          style={{
            fontSize: "30px",
            color: logoColor,
            backgroundColor: backgroundColor,
          }}
        />
      </div>
      <Dialog open={open} onClose={handleClose}  maxWidth="xs">
        <DialogTitle
          sx={{ display: "flex", "justify-content": "space-between" }}
        >
          <TextField
            margin="dense"
            id="name"
            autoFocus
            type="name"
            value={name}
            variant="standard"
            disabled={disable}
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
        </DialogTitle>
        <DialogContent>
          <Table sx={{ minWidth: 340 }} aria-label="simple table">
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
        </DialogContent>
        <DialogActions>
          {disable === true && (
            <Button
              align="right"
              variant="outlined"
              sx={{ height: "50%" }}
              onClick={() => {
                setDisable(false);
              }}
            >
              Edit
            </Button>
          )}

          {disable === false && (
            <>
              <Button variant="outlined" onClick={handleUpdate}>
                Save
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardCategory;
