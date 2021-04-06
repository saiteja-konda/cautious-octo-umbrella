import React, { useState } from "react";
import { useRouter } from "next/router";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = () => {
    if (username === "root" && password === "password") {
      localStorage.setItem("admin", true);
      router.push("/admin");
    } else {
      alert("Invalid username or password");
    }
  };
  return (
    <div
      className="background-image"
    >
      <form
        className="container"
        style={{
          width: "40%",
            marginTop: "15%",
        }}
        onSubmit={handleSubmit}
      >
        <div className="text-left mb-5 mt-5">

          <p
            className="display-4 text-light"
            style={{
              fontSize: "38px",
              fontWeight: "bold",
              position: "relative",
              textShadow:" 2px 2px  4px #000",
              blurRadius:"2px"
            }}
          >
            Welcome back admin, <br /> please login to continue
          </p>
        </div>
        <div className="form-group">
          <label>User Name</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input
            className="form-control"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-block btn-dark">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
