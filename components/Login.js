import React, { useState } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TransBar from "./TransBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
}));

export default function Login({user, setUser}) {
  const classes = useStyles();
  const router = useRouter();
  const { login } = useStoreActions((state) => state.vox);
  const handleLogin = (e) => {
    e.preventDefault();
    const loginObject = {
      username,
      password,
    };

    login(loginObject);
    setUser(true);
    router.push("/");
  };
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
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
          <div
            className="container"
            style={{ width: "300px" }}
            onSubmit={handleLogin}
          >
            <form className={classes.form}>
              <h5 className="text-center mb-4 mt-5 form-signin-heading">
                Please login
              </h5>
              <input
                type="text"
                className="form-control mb-4"
                name="email"
                placeholder="Email Address"
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <input
                type="password"
                className="form-control mb-4"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="btn btn-lg btn-dark btn-block" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
}

// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import { useRouter } from "next/router";
// import { useStoreActions } from "easy-peasy";

// const Login = ({ user, setUser }) => {

//   return (
//     <>
//       <Navbar />
//       <div
//         className="container"
//         style={{ width: "300px" }}
//         onSubmit={handleLogin}
//       >
// <form className="form-signin">
//   <h5 className="text-center mb-4 mt-5 form-signin-heading">Please login</h5>
//   <input
//     type="text"
//     className="form-control mb-4"
//     name="email"
//     placeholder="Email Address"
//     value={username}
//     onChange={(e) => {
//       setusername(e.target.value);
//     }}
//   />
//   <input
//     type="password"
//     className="form-control mb-4"
//     name="password"
//     placeholder="Password"
//     value={password}
//     onChange={(e) => {
//       setPassword(e.target.value);
//     }}
//   />
//   <button className="btn btn-lg btn-primary btn-block" type="submit">
//     Login
//   </button>
// </form>
//       </div>
//     </>
//   );
// };

// export default Login;
