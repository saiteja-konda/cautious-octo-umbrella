import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Bask In Nature
      </a>
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
        <form className="form-inline my-2 my-lg-0">
          <button
            className="btn my-2 my-sm-0"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="btn my-2 my-sm-0 ml-2"
            type="submit"
          >
            Sigh Up
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
