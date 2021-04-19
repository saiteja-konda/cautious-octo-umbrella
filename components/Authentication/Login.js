import React, { useRef } from "react";
import { useRouter } from "next/router";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import NavBar from "../../components/Navigation/NavBar";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "material-ui-formik-components/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { authUrl } from "../../utils/urlConfig";

import { useStoreActions } from "easy-peasy";

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

const Login = ({ user, setUser, products, categories }) => {
  const classes = useStyles();
  const router = useRouter();
  const formRef = useRef();
  const { getToken } = useStoreActions((state) => state.vox);
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
    const loginObject = {
      username: formRef.current.values.username,
      password: formRef.current.values.password,
    };

    axios
      .post(`${authUrl}/users/login`, loginObject)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data));
        getToken(res.data);
      })
      .then(() => {
        setUser(true);
        router.push("/");
      })
      .catch((err) => {
        note();
      });
  };

  const validationSchema = Yup.object({
    username: Yup.string("Enter your username")
      .required("Username is required")
      .max(40),
    password: Yup.string().required("Password can't be empty"),
  });
  return (
    <Grid container component="main" className={classes.root}>
      <NavBar
        user={user}
        categories={categories}
        products={products}
        setUser={setUser}
      />
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
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
};

export default Login;
