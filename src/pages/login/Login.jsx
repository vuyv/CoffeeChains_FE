import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loadCurrentUser } from "../../redux/actions/employeeAction";

const theme = createTheme();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.authReducer);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(username, password));
  };

  if (auth.token && auth.role) {
    dispatch(loadCurrentUser());
    switch (auth.role) {
      case "OWNER":
        navigate("/owner");
        break;
      case "SELLER":
        navigate("/seller");
        break;
      case "MANAGER":
        navigate("/manager");
        break;
      default:
    }
  }

  return (
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ marginBottom: "8px" }}
          />
          <button
            type="submit"
            fullWidth
            variant="contained"
            style={{
              marginTop: "20px",
              width: "315px",
              background: "#1976d2",
              marginBottom: "15px",
              color: "white",
              padding: "6px 16px",
              border: "none",
              borderRadius: "4px",
              fontFamily: "Roboto",
              fontWeight: "430",
            }}
          >
            SIGN IN
          </button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                href="#"
                onClick={() => navigate("/forgot_password")}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
