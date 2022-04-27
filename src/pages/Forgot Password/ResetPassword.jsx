import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { resetPassword } from "../../redux/actions/employeeAction";
import { Link } from "@mui/material";
import Grid from "@mui/material/Grid";

const theme = createTheme();

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.employeeReducer.employee);

  const confirmPassWordHandler = () => {
    const pass = document.getElementById("password");
    const confirmPass = document.getElementById("confirmPassword");
    return pass.value === confirmPass.value;
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (confirmPassWordHandler() == true) {
      dispatch(resetPassword(user.phone, password, confirmPassword));
      navigate("/login");
    } else{
      document.getElementById("error").innerHTML = "Confirm password not match!"
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            Change Password
          </Typography>
          <Box
            component="form"
            onSubmit={handleResetPassword}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Create Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div id="error" style={{ color: "red" }}></div>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={confirmPassWordHandler}
            >
              Change Password
            </Button>
          </Box>
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
}

export default ResetPassword;
