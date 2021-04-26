import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { TextField } from "material-ui-formik-components/TextField";
import { RadioGroup } from "material-ui-formik-components/RadioGroup";
import { Select } from "material-ui-formik-components/Select";

import { authUrl } from "../../utils/urlConfig";
import NavBar from "../../components/Navigation/NavBar";

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

export default function SignUp({ user, setUser, products, categories }) {
  const classes = useStyles();
  const router = useRouter();
  const { signup } = useStoreActions((state) => state.vox);
  const formRef = useRef();
  const [errorMessage, setErrorMessage] = useState({});
  const [isLoading, setLoading] = useState(false);

  const note = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  let months = [];
  let days = [];
  let years = [];

  const daysGen = () => {
    for (let day = 1; day <= 31; day++) {
      day.toString().length < 2
        ? days.push({ label: `0${day}`, value: `0${day}` })
        : days.push({ label: `${day}`, value: `${day}` });
    }
  };
  const monthsGen = () => {
    for (let month = 1; month <= 12; month++) {
      month.toString().length < 2
        ? months.push({ label: `0${month}`, value: `0${month}` })
        : months.push({ label: `${month}`, value: `${month}` });
    }
  };
  const yearsGen = () => {
    for (let year = 1900; year <= 2021; year++) {
      years.push({ label: `${year}`, value: `${year}` });
    }
  };

  daysGen();
  monthsGen();
  yearsGen();

  const handleSignUp = () => {
    setLoading(true);
    let date =
      formRef.current.values.year +
      "-" +
      formRef.current.values.month +
      "-" +
      formRef.current.values.day;

    const registerObject = {
      username: formRef.current.values.username,
      fullName: formRef.current.values.fullName,
      password: formRef.current.values.password,
      confirmPassword: formRef.current.values.confirmPassword,
      gender: formRef.current.values.gender,
      phoneNumber: formRef.current.values.phoneNumber,
      dateOfBirth: date,
    };

    axios
      .post(`${authUrl}/users/register`, registerObject)
      .then(() => {
        router.push("/user/auth/login");
      })
      .catch((err) => {
        setErrorMessage(err.response);
        let msg = [];
        for (var key in errorMessage) {
          var value = errorMessage[key].toString();
          msg.push({ message: value });
        }
        msg.forEach((m) => {
          note(m.message);
        });
        setLoading(false);
      });
    console.log(registerObject);
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .email("Enter your username")
      .required("Email is required")
      .max(40),
    password: Yup.string().required("Password can't be empty").min(6),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  return (
    <Grid container component="main" className={classes.root}>
      <NavBar />
      {/* <CssBaseline /> */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <h5 className="text-center form-signin-heading mt-5">
            Register to become a member
          </h5>
          <Formik
            initialValues={{
              username: "",
              password: "",
              fullName: "",
              gender: "",
              confirmPassword: "",
              phoneNumber: "",
              dateOfBirth: "",
              month: "",
              day: "",
              year: "",
            }}
            onSubmit={(values) => handleSignUp(values)}
            validationSchema={validationSchema}
            innerRef={formRef}
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
                  label="Email"
                  component={TextField}
                />
                <Field
                  required
                  size="small"
                  variant="outlined"
                  name="phoneNumber"
                  label="Mobile Number"
                  component={TextField}
                />

                <Field
                  required
                  size="small"
                  variant="outlined"
                  // type="password"
                  name="gender"
                  label="Gender"
                  options={[
                    { value: "MALE", label: "MALE" },
                    { value: "FEMALE", label: "FEMALE" },
                  ]}
                  component={RadioGroup}
                  groupProps={{ row: true }}
                />
                <div className="">
                  <div className="d-flex d-flex justify-content-around">
                    <Field
                      required
                      size="small"
                      variant="outlined"
                      name="day"
                      label="Day"
                      options={days}
                      component={Select}
                      className="mr-2"
                    />
                    <Field
                      required
                      size="small"
                      variant="outlined"
                      name="month"
                      label="Month"
                      options={months}
                      component={Select}
                      className="mr-2"
                    />
                    <Field
                      required
                      size="small"
                      variant="outlined"
                      name="year"
                      label="Year"
                      options={years}
                      component={Select}
                      className="mr-2"
                    />
                  </div>
                </div>
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
                {isLoading ? (
                  <button
                    className="btn btn-dark btn-block"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </button>
                ) : (
                  <button className="btn btn-dark btn-block" type="submit">
                    Sign up
                  </button>
                )}

                {/* <Button
                  fullWidth
                  variant="contained"
                  className={classes.button}
                  type="submit"
                >
                  SignUp
                </Button> */}
              </Form>
            )}
          </Formik>
          <ToastContainer
            position="bottom-right"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
        </div>
      </Grid>
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
    </Grid>
  );
}
