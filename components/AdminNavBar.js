import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function AdminNavBar() {
  const router = useRouter();

  const LogoutFun = (e) => {
    e.preventDefault();
    localStorage.removeItem('admin')
    router.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/admin/dashboard">
        <a className="navbar-brand">SiteAdmin</a>
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link href="/admin/dashboard">
              <a className="nav-link">Dashboard</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/admin/products">
              <a className="nav-link">Products</a>
            </Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <button
            className="btn my-2 my-sm-0"
            type="submit"
            onClick={LogoutFun}
          >
            Logout
          </button>
        </form>
      </div>
    </nav>
  );
}

export default AdminNavBar;
