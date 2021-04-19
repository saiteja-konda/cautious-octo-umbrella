import React, { useState, useEffect } from "react";
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

const NavBar = ({ user, setUser, categories, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const { len } = useStoreState((actions) => actions.vox);
  const [cartlen, setCartlen] = useState();
  const [openCart, setOpenCart] = useState(false);

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

  return (
    <div>
      <Navbar
        // color="light"
        light
        expand="md"
        fixed="top"
        style={{ backgroundColor: "#ffffff" }}
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
              <NavLink href="/components/">Shop By Concern</NavLink>
            </NavItem>
            <Options categories={categories} products={products} />
            <NavItem>
              <NavbarText>
                <Link href="/about">
                  <a
                    className="text-dark mr-2"
                    style={{  textDecoration: "none" }}
                  >
                    About us
                  </a>
                </Link>
              </NavbarText>
            </NavItem>
            <NavItem>
              <NavbarText>
                <Link href="/about">
                  <a
                    className="text-dark mr-2"
                    style={{  textDecoration: "none" }}
                  >
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
              <LocalMallIcon />
            </Badge>
          </IconButton>
          <button className="btn btn-sm btn-light mr-2">Login</button>
          <button className="btn btn-sm btn-light mr-2">sign up</button>
        </Collapse>
      </Navbar>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />

      <div style={{ paddingBottom: "100px" }}></div>
    </div>
  );
};

export default NavBar;
