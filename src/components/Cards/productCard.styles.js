import { TextareaAutosize } from "@material-ui/core";
import { fontSize, textTransform } from "@mui/system";

export const productCardStyles = (theme) => ({
  root: {
    maxWidth: 350,
    backgroundColor: theme.palette.background.card,
    position: "relative",
  },
  media: {
    height: 250,
  },
  productName: {
    height: 70,
    textTransform: "uppercase",
  },
  actions: {
    height: 70,
    display: "flex",
    justifyContent: "space-between",
  },
  quantity: {
    size: 100,
  },
  ribbon: {
    position: "absolute",
    right: "-5px",
    top: "-5px",
    zIndex: 1,
    overflow: "hidden",
    width: "75px",
    height: "75px",
    textAlign: "right",

    "& span": {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#fff",
      textTransform: "uppercase",
      textAlign: "center",
      lineHeight: "20px",
      transform: "rotate(45deg)",
      width: "100px",
      display: "block",
      background: "red",
      boxShadow: "0 3px 10px -5px rgba(0, 0, 0, 1)",
      position: "absolute",
      top: "19px",
      right: "-21px",

      "&::after": {
        content: "''",
        position: "absolute",
        right: "0px",
        top: "100%",
        zIndex: "-1",
        borderLeft: "3px solid transparent",
        borderRight: "3px solid #8f5408",
        borderBottom: "3px solid transparent",
        borderTop: "3px solid #8f5408",
      },

      "&::before": {
        content: "''",
        position: "absolute",
        left: "0px",
        top: "100%",
        zIndex: "-1",
        borderLeft: "3px solid #8f5408",
        borderBottom: "3px solid transparent",
        borderRottom: "3px solid transparent",
        borderTop: "3px solid #8f5408",
      },
    },
  },
});
