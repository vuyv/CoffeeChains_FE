export const productPageStyles = theme => ({
  container: {
    margin: "30px",
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      alignItems: "center"
    }
  },
  panel: {
    marginTop: "30px",
    background: theme.palette.background.default
  }
});
