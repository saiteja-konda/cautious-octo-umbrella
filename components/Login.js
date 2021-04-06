import React, { useState } from "react";
import Navbar from "./Navbar";
import { useRouter } from "next/router";
import { useStoreActions } from "easy-peasy";

const Login = ({ user, setUser }) => {
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
    <>
      <Navbar />
      <div
        className="container"
        style={{ width: "500px" }}
        onSubmit={handleLogin}
      >
        <form className="form-signin">
          <h5 className="text-center mb-4 form-signin-heading">Please login</h5>
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
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
