import React, { useState, useEffect } from "react";
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

import IconButton from "@material-ui/core/IconButton";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import { useStoreActions, useStoreState } from "easy-peasy";
import Link from "../components/StickyFooter"
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
  appBar: {
    backgroundColor: "white",
    color: "black",
    boxShadow: "none",
    padding: "10px 0px",
  },
});

function PlainBar(props, { user, setUser }) {
  const classes = useStyles();
  const { len } = useStoreState((actions) => actions.vox);
  const [cartlen, setCartlen] = useState();
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
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar className={classes.appBar} position="fixed">
          <Toolbar variant="dense">
            <Typography variant="h5" noWrap>
              {props.title}
            </Typography>
            <section className={classes.rightToolbar}>
              <Box display={{ sm: "block", xs: "block", md: "none" }}>
                <IconButton color="inherit" aria-label="Edit">
                  <Badge badgeContent={cartlen} color="error">
                    <LocalMallIcon />
                  </Badge>
                </IconButton>
              </Box>
              <Box display={{ sm: "none", xs: "none", md: "block" }}>
                <IconButton color="inherit" aria-label="Edit">
                  <Badge badgeContent={cartlen} color="error">
                    <LocalMallIcon />
                  </Badge>
                </IconButton>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                >
                  Login
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  className={classes.button}
                >
                  Signup
                </Button>
              </Box>
            </section>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </ThemeProvider>
    </div>
  );
}

export default PlainBar;
