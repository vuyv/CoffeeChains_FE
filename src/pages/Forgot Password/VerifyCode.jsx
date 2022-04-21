import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadEmployeeByPhone } from "./../../redux/actions/employeeAction";
import { useSelector } from "react-redux";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";

const theme = createTheme();

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.employeeReducer.employee);

  const verifyCode = (e) => {
    e.preventDefault();
    if (Object.keys(user).length != 0) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(code)
        .then((result) => {
            navigate("/reset_password");
        })
        .catch((error) => {
          document.getElementById("error").innerHTML = "Wrong code! Try again."
        });
    } else{
      navigate("/forgot_password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            padding: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "2rem ",
            border: "2px solid #f1f3f4",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Verification Code
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Enter Code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              // autoComplete
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={verifyCode}
            >
              Verify
            </Button>
          </Box>
          <div id="error" style={{ color: "red" }}></div>
          <Grid container>
            <Grid item>
              <Link href="#" onClick={() => navigate(-1)}>
                Back
              </Link>
            </Grid>
            <Grid item xs></Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default VerifyCode;
