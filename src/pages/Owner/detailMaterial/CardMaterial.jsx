import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import "./cardMaterial.scss";
import { TableContainer } from "@mui/material";

const CardMaterial = (props) => {
  const { item } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    window.setTimeout(() => {
      setOpen(false);
    }, 20);
  };

  return (
    <div
      className="widget col-3"
      id="cardMaterial"
      onClick={handleClickOpen}
      style={{ backgroundImage: `url(${item.image})` }}
    >
      <div className="left">
        <span className="title">
          <i>MATERIAL</i>
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
          {item.name}
        </DialogTitle>
        <DialogContent scroll={"paper"}>
          <TableContainer sx={{ minWidth: 340, maxHeight: 440 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Unit</TableCell>
                  <TableCell align="right">Net Weight</TableCell>
                  <TableCell align="right">Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.units.map((unit) => (
                  <TableRow
                    key={unit.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {unit.unit}
                    </TableCell>
                    <TableCell align="right">{unit.netWeight}</TableCell>
                    <TableCell align="right">{unit.rate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CardMaterial;
