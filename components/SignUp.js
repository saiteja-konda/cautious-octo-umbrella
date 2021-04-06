import React, { useState } from "react";
import Navbar from "./Navbar";
// import axios from "axios";
import { authUrl } from "../utils/urlConfig";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";

const SignUp = () => {
  const router = useRouter();
  const { signup } = useStoreActions((state) => state.vox);
  const handleSignUp = (e) => {
    e.preventDefault();
    const registerObject = {
      username: email,
      fullName: username,
      password,
      confirmPassword,
    };
    // axios
    //   .post(`${authUrl}/users/register`, registerObject)
    //   .then(() => router.push("/user/login"))
    //   .catch((err) => {
    //     console.error(err);
    //   });

    signup(registerObject).then(() => router.push("/user/login"));
  };
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  return (
    <>
      <Navbar />
      <div
        className="container"
        className="container"
        style={{ width: "500px" }}
        onSubmit={handleSignUp}
      >
        <form className="form-signin">
          <h5 className="text-center mb-4 form-signin-heading">
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
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
