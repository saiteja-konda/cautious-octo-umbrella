import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  makeStyles,
  Button,
  Box,
  Badge,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import jwt_decode from "jwt-decode";
import { useStoreActions, useStoreState } from "easy-peasy";
import Link from "next/link";
import Cart from "./Cart/Cart";
import SideMenu from "./SideMenu";
import SecondaryNav from "./Navigation/Options";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
  button: {
    textTransform: "none",
    color: "black",
    backgroundColor: "white",
    margin: "5px",
  },
  appBar: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    padding: "10px 0px",
  },
});

function PlainBar(props) {
  const classes = useStyles();

  const router = useRouter();

  const { len } = useStoreState((actions) => actions.vox);
  const { removeUser } = useStoreActions((actions) => actions.vox);
  const [cartlen, setCartlen] = useState();
  const [openCart, setOpenCart] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [userName, setUserName] = useState(false);

  const showMenu = () => {
    if (!openMenu) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  };
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
  const theme = createMuiTheme({
    props: {
      MuiButton: {
        disableElevation: true,
      },
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      props.setUser(true);
      jwt_decode(localStorage.getItem("token"));
      setUserName(jwt_decode(localStorage.getItem("token")).fullName);
    }
  });

  const handleLogout = () => {
    props.setUser(false);
    localStorage.removeItem("token");
    removeUser();
    router.push("/");
  };

  const options = () => {
    if (!props.user) {
      return (
        <>
          <Link href="/user/login">
            <Button size="small" variant="contained" className={classes.button}>
              Login
            </Button>
          </Link>
          <Link href="/user/signup">
            <Button size="small" variant="contained" className={classes.button}>
              Signup
            </Button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link href="/account">
            <Button size="small" variant="contained" className={classes.button}>
              {userName}
            </Button>
          </Link>
          <Link href="/">
            <Button
              size="small"
              onClick={handleLogout}
              variant="contained"
              className={classes.button}
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
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar className={classes.appBar} position="fixed">
          <Toolbar variant="dense">
            <Link href="/">
              <a
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                {/* <Typography variant="h5" noWrap>
                  {props.title}
                </Typography> */}
                <img
                  src="/favicon.ico"
                  style={{ height: "75px", width: "75px" }}
                />
              </a>
            </Link>
            <SecondaryNav categories={props.categories} />
            <section className={classes.rightToolbar}>
              {/* <Box display={{ sm: "block", xs: "block", md: "none" }}>
                <IconButton
                  color="inherit"
                  aria-label="Edit"
                  onClick={showCart}
                >
                  <Badge badgeContent={cartlen} color="error">
                    <LocalMallIcon />
                  </Badge>
                </IconButton>
              </Box> */}
              <Box display={{ sm: "block", xs: "block", md: "none" }}>
                <IconButton
                  color="inherit"
                  aria-label="Edit"
                  onClick={showCart}
                >
                  <Badge badgeContent={cartlen} color="error">
                    <LocalMallIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="Menu"
                  onClick={showMenu}
                >
                  <MenuOpenIcon />
                </IconButton>
              </Box>
              <Box display={{ sm: "none", xs: "none", md: "block" }}>
                <IconButton
                  color="inherit"
                  aria-label="Edit"
                  onClick={showCart}
                >
                  <Badge badgeContent={cartlen} color="error">
                    <LocalMallIcon />
                  </Badge>
                </IconButton>
                <>{RenderOptions}</>
              </Box>
            </section>
          </Toolbar>
        </AppBar>
        <Toolbar />
        {/* <Toolbar /> */}
      </ThemeProvider>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <SideMenu
        openMenu={openMenu}
        categories={props.categories}
        setOpenMenu={setOpenMenu}
        user={props.user}
        setUser={props.setUser}
      />
    </>
  );
}

export default PlainBar;
