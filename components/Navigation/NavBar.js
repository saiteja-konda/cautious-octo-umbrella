import { Badge, Button, IconButton, makeStyles } from "@material-ui/core";
import { green, grey } from "@material-ui/core/colors";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useStoreActions, useStoreState } from "easy-peasy";
import jwt_decode from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { NavContext } from "../../pages/_app";
import Cart from "../Cart/Cart";
import Options from "./Options";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    backgroundColor: green[800],
    color: grey[200],
    marginRight:"10px",
    "&:hover": {
      backgroundColor: green[300],
      color: grey["800"],
    },
  },
  button2: {
    textTransform: "none",
    color: grey[700],
    backgroundColor: green[200],
  },
}));
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
  const classes = useStyles();

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
          <Button
            size="small"
            onClick={() => router.push("/user/auth/login")}
          >
            Login
          </Button>
          <Button
            size="small"
            onClick={() => router.push("/user/auth/signup")}
          >
            Signup
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Link href="/user/account">
            <Button size="small" className={classes.button}>
              {userName}
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="small"
              className={classes.button2}
              onClick={handleLogout}
            >
              Logout
            </Button>
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
          boxShadow: `2px 2px 30px ${green[50]}`,
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
              <LocalMallIcon style={{ color: green[800] }} />
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
