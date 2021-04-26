import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { baseUrl } from "../../utils/urlConfig";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`${baseUrl}/site`)
      .then((res) => {
        let siteUsername = res.data.username;
        let sitePassword = res.data.password;

        if (username === siteUsername && password === sitePassword) {
          localStorage.setItem("KEY_ID", process.env.NEXT_PUBLIC_KEY_SECRET);
          router.push("/admin");
        } else {
          alert("Invalid username or password");
        }
      })
      .catch((err) => {
        return 0;
      });
  };
  return (
    <div>
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
            className="display-4 text-dark"
            style={{
              fontSize: "38px",
              fontWeight: "bold",
              position: "relative",
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
          <label>Password</label>
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
