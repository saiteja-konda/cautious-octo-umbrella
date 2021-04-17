import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Box, Typography, Button } from "@material-ui/core";
import ListGroup from "./Dashboard/ListGroup";
import Link from "next/link";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const drawerWidth = 375;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  button1: {
    backgroundColor: "white",
    color: "black",
    margin: "8px",
  },
  button2: {
    backgroundColor: "black",
    color: "white",
    margin: "8px",
  },
  button: {
    textTransform: "none",
    backgroundColor: "black",
    color: "white",
    margin: "5px",
  },
  listGroup: {
    marginTop: "100px",
  },
}));

export default function SideMenu({
  openMenu,
  setOpenMenu,
  categories,
  user,
  setUser,
}) {
  const classes = useStyles();
  const router = useRouter();

  const theme = useTheme();
  const start = [{ id: "Shop by concern", name: "Shop by concern" }];
  const end = [
    { id: "About us", name: "About us" },
    { id: "Contact us", name: "Contact us" },
  ];
  const dyanmic = [...start, ...categories, ...end];
  const [currentGenre, setCurrentGenre] = useState([]);
  const [userName, setUserName] = useState(false);

  const handleGenreSelect = (genre) => {
    setCurrentGenre(genre);
  };
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      setUser(true); 
      jwt_decode(localStorage.getItem("token"));
      setUserName(jwt_decode(localStorage.getItem("token")).fullName);
    }
  });

  const handleLogout = () => {
    setUser(false);
    localStorage.removeItem("token");
    router.push("/");
  };

  const options = () => {
    if (!user) {
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
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={openMenu}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpenMenu(false)}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <>
          <div className="mt-3"></div>
          <ListGroup
            Items={dyanmic}
            onItemSelect={handleGenreSelect}
            selectedItem={currentGenre}
          />
          <div className="container p-2">
            <Box>
              <>{RenderOptions}</>
            </Box>
          </div>
        </>
      </Drawer>
    </div>
  );
}
