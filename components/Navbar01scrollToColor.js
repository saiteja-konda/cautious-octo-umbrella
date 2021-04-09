import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { useStoreActions, useStoreState } from "easy-peasy";

import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  createMuiTheme,
  makeStyles,
  Button,
  Box,
  Badge,
} from "@material-ui/core";
import ScrollToColor01 from "./ScrollToColor01";
import IconButton from "@material-ui/core/IconButton";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";


import Cart from "./Cart";

const useStyles = makeStyles({
  // This group of buttons will be aligned to the right
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
});
const Navbar01scrollToColor = (props) => {
  const classes = useStyles();
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
          {/* <Link href="/"> */}
          <Button size="small" variant="contained" className={classes.button}>
            {userName}
          </Button>
          {/* </Link> */}
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
        <ScrollToColor01>
          <AppBar position="fixed">
            <Toolbar variant="dense">
              <Link href="/">
                <Typography variant="h5" noWrap>
                  {props.title}
                </Typography>
              </Link>
              <section className={classes.rightToolbar}>
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
                  <IconButton color="inherit" aria-label="Edit">
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
        </ScrollToColor01>
      </ThemeProvider>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
    </>
  );
};

export default Navbar01scrollToColor;
