import React, { useState } from "react";
import axios from "axios";
import { authUrl } from "../utils/urlConfig";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TransBar from "./TransBar";

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

export default function SignUp({ user, setUser }) {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { signup } = useStoreActions((state) => state.vox);
  const handleSignUp = (e) => {
    e.preventDefault();
    const registerObject = {
      username: email,
      fullName: username,
      password,
      confirmPassword,
    };
  };
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
            className="container"
            style={{ width: "300px" }}
            onSubmit={handleSignUp}
          >
            <form className="form-signin">
              <h5 className="text-center mb-4 mt-5 form-signin-heading">
                Please Register
              </h5>
              <input
                type="text"
                className="form-control mb-4"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                className="form-control mb-4"
                name="fullName"
                placeholder="Full Name"
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
              <input
                type="password"
                className="form-control mb-4"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
              />
              <button className="btn btn-lg btn-dark btn-block" type="submit">
                Sign up
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
// // import axios from "axios";
// import { authUrl } from "../utils/urlConfig";
// import { useRouter } from "next/router";
// import { useStoreActions } from "easy-peasy";

// const SignUp = () => {
// const router = useRouter();
// const { signup } = useStoreActions((state) => state.vox);
// const handleSignUp = (e) => {
//   e.preventDefault();
//   const registerObject = {
//     username: email,
//     fullName: username,
//     password,
//     confirmPassword,
//   };
//   // axios
//   //   .post(`${authUrl}/users/register`, registerObject)
//   //   .then(() => router.push("/user/login"))
//   //   .catch((err) => {
//   //     console.error(err);
//   //   });

//     signup(registerObject).then(() => router.push("/user/login"));
//   };
//   const [username, setusername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setconfirmPassword] = useState("");
//   return (
//     <>
//       <Navbar />
// <div
//   className="container"
//   className="container"
//   style={{ width: "300px" }}
//   onSubmit={handleSignUp}
// >
//   <form className="form-signin">
//     <h5 className="text-center mb-4 mt-5 form-signin-heading">
//       Please Register
//     </h5>
//     <input
//       type="text"
//       className="form-control mb-4"
//       name="email"
//       placeholder="Email Address"
//       value={email}
//       onChange={(e) => {
//         setEmail(e.target.value);
//       }}
//     />
//     <input
//       type="text"
//       className="form-control mb-4"
//       name="fullName"
//       placeholder="Full Name"
//       value={username}
//       onChange={(e) => {
//         setusername(e.target.value);
//       }}
//     />
//     <input
//       type="password"
//       className="form-control mb-4"
//       name="password"
//       placeholder="Password"
//       value={password}
//       onChange={(e) => {
//         setPassword(e.target.value);
//       }}
//     />
//     <input
//       type="password"
//       className="form-control mb-4"
//       name="confirmpassword"
//       placeholder="Confirm Password"
//       value={confirmPassword}
//       onChange={(e) => {
//         setconfirmPassword(e.target.value);
//       }}
//     />
//     <button className="btn btn-lg btn-primary btn-block" type="submit">
//       Sign up
//     </button>
//   </form>
// </div>
//     </>
//   );
// };

// export default SignUp;
