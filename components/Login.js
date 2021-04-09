import React, { useRef } from "react";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "easy-peasy";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TransBar from "./TransBar";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    width: "100%",
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

export default function Login({ user, setUser }) {
  const classes = useStyles();
  const router = useRouter();
  const { login } = useStoreActions((state) => state.vox);
  const { error } = useStoreState((state) => state.vox);
  const formRef = useRef();
  const note = () => {
    toast.error("Invalid Username or Password please try again", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const handleLogin = () => {
    // event.preventDefault();
    const loginObject = {
      username: formRef.current.values.username,
      password: formRef.current.values.password,
    };

    login(loginObject).then(() => {
      // if (error === "yes") {
      //   // toast.error("🦄 Wow so easy!", {

      //   // });
      //   note()
      // } else {
      //   setUser(true);
      //   router.push("/");
      // }

      if (error === "yes") {
        note();
      } else if (error === "no") {
        setUser(true);
        router.push("/");
      }
    });

    // router.push("/");

    console.log(formRef.current.values);
  };

  const validationSchema = Yup.object({
    username: Yup.string("Enter your username")
      .required("Username is required")
      .max(40),
    password: Yup.string().required("Password can't be empty"),
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
            }}
            onSubmit={() => {
              handleLogin();
            }}
            validationSchema={validationSchema}
            innerRef={formRef}
          >
            {(props) => (
              <Form>
                <Field
                  required
                  size="small"
                  variant="outlined"
                  name="username"
                  label="User Name"
                  component={TextField}
                />

                <Field
                  required
                  size="small"
                  variant="outlined"
                  type="password"
                  name="password"
                  label="Password"
                  component={TextField}
                />
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}
