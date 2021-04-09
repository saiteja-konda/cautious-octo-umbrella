import React, { useState } from "react";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TransBar from "./TransBar";
import { Button } from "@material-ui/core";


import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";


const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    color: "white",
    backgroundColor: "black",
  },
}));

export default function SignUp({ user, setUser }) {
  const classes = useStyles();
  const router = useRouter();
  const { signup } = useStoreActions((state) => state.vox);
  const handleSignUp = (values) => {
    // e.preventDefault();
    const registerObject = {
      username: email,
      fullName: username,
      password,
      confirmPassword,
    };

    signup(registerObject);
    router.push("/");
  };

   const validationSchema = Yup.object({
     username: Yup.string("Enter your username")
       .required("Username is required")
       .max(40),
     password: Yup.string().required("Password can't be empty"),
     confirmPassword: Yup.string().required("This Field can't be empty")
   });
  return (
    <Grid container component="main" className={classes.root}>
      <TransBar title="Baskin In Nature" />
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div
          className={classes.paper}
          style={{
            marginTop: "150px",
          }}
        >
          <h5 className="text-center mb-4 mt-5 form-signin-heading">
            Please login
          </h5>
          <Formik
            initialValues={{
              username: "",
              password: "",
              fullName: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => handleSignUp(values)}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form>
                <Field
                  required
                  size="small"
                  variant="outlined"
                  name="fullName"
                  label="Full lName"
                  component={TextField}
                />
                <Field
                  required
                  size="small"
                  variant="outlined"
                  name="username"
                  label="username"
                  component={TextField}
                />

                <Field
                  required
                  size="small"
                  variant="outlined"
                  type="password"
                  name="password"
                  label="password"
                  component={TextField}
                />
                <Field
                  required
                  size="small"
                  variant="outlined"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  component={TextField}
                />
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  type="submit"
                >
                  SignUp
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
