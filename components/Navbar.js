import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { useStoreActions, useStoreState } from "easy-peasy";

function Navbar({ user, setUser }) {
  const [userName, setUserName] = useState(false);
  const { len } = useStoreState((actions) => actions.vox);

  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUser(true);
      jwt_decode(localStorage.getItem("token"));
      setUserName(jwt_decode(localStorage.getItem("token")).fullName);
    }
  },);

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("token");
    router.push("/");
  };
  const Options = () => {
    if (!user) {
      return (
        <form className="form-inline my-2 my-lg-0">
          <Link href="/cart">
            <button className="btn">
              {" "}
              <i class="fas fa-shopping-bag"></i>{" "}
              <span class="badge badge-warning" id="lblCartCount">
                {len}
              </span>
            </button>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            href="/user/login"
          >
            <button className="btn my-2 my-sm-0" type="submit">
              Login
            </button>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            href="/user/signup"
          >
            <button className="btn my-2 my-sm-0 ml-2" type="submit">
              Signup
            </button>
          </Link>
        </form>
      );
    } else {
      return (
        <form className="form-inline my-2 my-lg-0">
          <Link href="/cart">
            <button className="btn">
              {" "}
              <i class="fas fa-shopping-bag"></i>{" "}
              <span class="badge badge-warning" id="lblCartCount">
                {len}
              </span>
            </button>
          </Link>
          <button className="btn my-2 my-sm-0" type="submit">
            {userName}
          </button>
          <button
            className="btn my-2 my-sm-0 ml-2"
            type="submit"
            onClick={handleLogout}
          >
            Logout
          </button>
        </form>
      );
    }
  };

  const renderOptions = Options();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/">
        <a className="navbar-brand">Bask In Nature</a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto"></ul>
        {renderOptions}
      </div>
    </nav>
  );
}

export default Navbar;
