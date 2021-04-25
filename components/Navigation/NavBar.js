import React, { useState, useEffect, useContet, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
} from "reactstrap";
import Link from "next/link";
import { IconButton, Badge } from "@material-ui/core";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { useStoreActions, useStoreState } from "easy-peasy";
import Cart from "../Cart/Cart";
import Options from "./Options";
import { useRouter } from "next/router";
import { NavContext } from "../../pages/_app";
import jwt_decode from "jwt-decode";

const NavBar = ({ shadow }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { categories, products, user, setUser } = useContext(NavContext);
  const { removeUser } = useStoreActions((actions) => actions.vox);

  const { len } = useStoreState((actions) => actions.vox);

  const [cartlen, setCartlen] = useState();
  const [openCart, setOpenCart] = useState(false);
  const [userName, setUserName] = useState(false);

  const router = useRouter();

  const showCart = () => {
    if (!openCart) {
      setOpenCart(true);
    } else {
      setOpenCart(false);
    }
  };

  useEffect(() => {
    setCartlen(len);
  });

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUser(true);
      jwt_decode(localStorage.getItem("token"));
      setUserName(jwt_decode(localStorage.getItem("token")).fullName);
    }
  });

  const handleLogout = () => {
    router.push("/");
    setUser(false);
    localStorage.removeItem("token");
    removeUser();
  };

  const options = () => {
    if (!user) {
      return (
        <>
          <button
            className="btn btn-sm btn-light mr-2"
            onClick={() => router.push("/user/auth/login")}
          >
            Login
          </button>
          <button
            className="btn btn-sm btn-light mr-2"
            onClick={() => router.push("/user/auth/signup")}
          >
            Signup
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link href="/user/account">
            <button className="btn btn-sm btn-dark mr-2">{userName}</button>
          </Link>
          <Link href="/">
            <button
              className="btn btn-sm btn-outline-secondary  mr-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </>
      );
    }
  };
  const RenderOptions = options();

  return (
    <div>
      <Navbar
        light
        expand="md"
        fixed="top"
        // className="shadow p-3 mb-5 bg-white rounded"
        style={{
          backgroundColor: "#ffffff",
          color: "#000000",
          boxShadow: "2px 2px 30px #ede7f6",
        }}
      >
        <NavbarBrand href="/">
          <Link href="/">
            <a
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              <img
                src="/favicon.ico"
                style={{ height: "75px", width: "75px" }}
              />
            </a>
          </Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} style={{ border: "none" }}>
          <IconButton color="inherit" aria-label="Menu">
            <MenuOpenIcon />
          </IconButton>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/" style={{ color: "#000000" }}>
                Shop By Concern
              </NavLink>
            </NavItem>
            <Options categories={categories} products={products} />
            <NavItem>
              <NavbarText>
                <Link href="/about">
                  <a className="mr-2" style={{ textDecoration: "none" }}>
                    Our story
                  </a>
                </Link>
              </NavbarText>
            </NavItem>
            <NavItem>
              <NavbarText>
                <Link href="/about">
                  <a className="mr-2" style={{ textDecoration: "none" }}>
                    Contact us
                  </a>
                </Link>
              </NavbarText>
            </NavItem>
          </Nav>
          <IconButton
            color="inherit"
            aria-label="Cart"
            className="d-none d-md-block d-lg-block d-xl-block "
            onClick={showCart}
          >
            <Badge badgeContent={cartlen} color="error">
              <LocalMallIcon style={{ color: "#2ab7ca" }} />
            </Badge>
          </IconButton>
          {RenderOptions}
        </Collapse>
      </Navbar>

      <Cart openCart={openCart} setOpenCart={setOpenCart} user={user} />
      <div style={{ paddingBottom: "100px" }}></div>
    </div>
  );
};

NavBar.defautProps = {
  shadow: true,
};
export default NavBar;
