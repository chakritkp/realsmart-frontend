import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import useApi from "../hook/useApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../component/loader";

const SignUpForm = () => {
  const { useSignUp } = useApi();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .required("E-mail is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$|^\d{10}$/,
        "Please enter a valid email"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Your password must contain between 4 and 60 characters.")
      .max(60, "Your password must contain between 4 and 60 characters."),
    validate_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    phone_number: yup
      .string()
      .required("Please enter a valid phone number")
      .matches(/^\d{10}$/, "Please enter a valid phone number"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSave = async (data: any) => {
    try {
      const res = await useSignUp(data);
      if (!res) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Loader open={open} handleClose={() => {}} />
      <form onSubmit={handleSubmit(handleSave)} method="post">
        <Box
          sx={{
            marginTop: 8,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => {
                  navigate("/sign-in");
                }}
                fullWidth
                variant="contained"
                color="error"
              >
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label=""
                    placeholder="Email"
                    helperText={errors.email ? errors.email.message : null}
                    variant="standard"
                    color="warning"
                    focused
                    error={!!errors.email}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label=""
                    type="password"
                    placeholder="Password"
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                    variant="standard"
                    color="warning"
                    focused
                    error={!!errors.password}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="validate_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label=""
                    type="password"
                    placeholder="Confirm password"
                    helperText={
                      errors.validate_password
                        ? errors.validate_password.message
                        : null
                    }
                    variant="standard"
                    color="warning"
                    focused
                    error={!!errors.validate_password}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label=""
                    type="test"
                    placeholder="Phone Number"
                    helperText={
                      errors.phone_number ? errors.phone_number.message : null
                    }
                    InputProps={{
                      startAdornment: (
                        <Typography
                          sx={{
                            marginRight: 1,
                          }}
                        >
                          +66
                        </Typography>
                      ),
                    }}
                    variant="standard"
                    color="warning"
                    focused
                    error={!!errors.phone_number}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth variant="contained" color="error">
                Get Started
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default SignUpForm;
