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
import { toast } from "react-toastify";
const theme = createTheme();

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: yup.object({
      phone: yup
        .string()
        .required("Required")
        .matches(/^[0-9]{10}$/, "Please enter a valid phone number"),
      password: yup
        .string()
        .required("Required")
        .length(8, "Must be 8 characters"),
    }),
    onSubmit: () => {
      navigate("/");
    },
  });

  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(username, password));
    // .then((res) => {
    //   navigate("/");
    // })
    // .catch(() => toast.errors("Invalid username or password"));
  };
  if (auth.token) navigate("/");

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
            Sign in
          </Typography>
          <Box
            component="form"
            // onSubmit={formik.handleSubmit}
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              // value={formik.values.phone}
              // onChange={formik.handleChange}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
            {formik.errors.phone}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              // value={formik.values.password}
              // onChange={formik.handleChange}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            {formik.errors.password}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}

export default Login;
