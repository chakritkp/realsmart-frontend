import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import useApi from "../hook/useApi";
import { useNavigate } from "react-router-dom";
import Loader from "../component/loader";

type SignInProps = {};

type FormInput = {
  username: string;
  password: string;
};

const SignIn: React.FC<SignInProps> = ({}) => {
  const { useSignIn } = useApi();
  const navigate = useNavigate();
  const [inputProps, setInputProps] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$|^\d{10}$/,
        "Please enter a valid username"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Your password must contain between 4 and 60 characters.")
      .max(60, "Your password must contain between 4 and 60 characters."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSave = async (data: FormInput) => {
    try {
      setOpen(true);
      const res = await useSignIn(data);
      if (res) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (value: any) => {
    if (/^\d+$/.test(value)) {
      setInputProps({
        startAdornment: (
          <Typography
            sx={{
              marginRight: 1,
            }}
          >
            +66
          </Typography>
        ),
      });
    } else {
      setInputProps(null);
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
            <Grid item xs={12}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"username"}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label=""
                    InputProps={inputProps}
                    onChange={(e: any) => {
                      field.onChange(e);
                      handleUsernameChange(e.target.value);
                    }}
                    placeholder="Email or phone number"
                    helperText={
                      errors.username ? errors.username?.message : null
                    }
                    variant="standard"
                    color="warning"
                    focused
                    error={!!errors.username}
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
              <Button type="submit" fullWidth variant="contained" color="error">
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  label="Remember me"
                  control={<Checkbox size="small" />}
                />
                <Typography>Need help?</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="start"
                alignItems="center"
                spacing={1}
              >
                <Typography>New to Netfilx?</Typography>
                <Typography
                  color={"primary"}
                  variant="subtitle1"
                  display="block"
                  onClick={() => navigate("/")}
                >
                  Sign up now
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                This page is protected by Goodle reCAPTCHA to ensure you're not
                a bot. Learn more
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Container>
  );
};

export default SignIn;
