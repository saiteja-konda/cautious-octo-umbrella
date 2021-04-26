import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import { useStoreState, useStoreActions } from "easy-peasy";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  bigAvatar: {
    width: 45,
    height: 45,
  },

  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes, onDrawerToggle } = props;
  var today = new Date();
  var curHr = today.getHours();

  const Greetings = () => {
    if (curHr < 12) {
      return (
        <Typography color="inherit" variant="h5" component="h1">
          Good morning Gargeyee Sirisha
        </Typography>
      );
    } else if (curHr < 18) {
      return (
        <Typography color="inherit" variant="h5" component="h1">
          Good afternoon Gargeyee Sirisha
        </Typography>
      );
    } else {
      return (
        <Typography color="inherit" variant="h5" component="h1">
          Good evening Gargeyee Sirisha
        </Typography>
      );
    }
  };

  const router = useRouter();

   const LogoutFun = (e) => {
    e.preventDefault();
    localStorage.removeItem("KEY_ID");
    router.push("/");
  };

  const wishes = Greetings();
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            {/* <Grid item>
              <Link className={classes.link} href="#" variant="body2">
                Logout
              </Link>
            </Grid> */}
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar
                  src="https://instagram.fhyd2-2.fna.fbcdn.net/v/t51.2885-19/s320x320/131013071_1327401950972256_3167032876231799955_n.jpg?tp=1&_nc_ht=instagram.fhyd2-2.fna.fbcdn.net&_nc_ohc=InnfDZAc4WsAX9iNbN1&edm=ABfd0MgAAAAA&ccb=7-4&oh=ac9c7c921f53ead4b0009ba032cfb727&oe=60985846&_nc_sid=7bff83"
                  alt="My Avatar"
                  className={classes.bigAvatar}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              {wishes}
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
                onClick={LogoutFun}
              >
                Logout
              </Button>
            </Grid>
            {/* <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={0} textColor="inherit">
          {/* <Tab textColor="inherit" label="Users" />
          <Tab textColor="inherit" label="Sign-in method" />
          <Tab textColor="inherit" label="Templates" />
          <Tab textColor="inherit" label="Usage" /> */}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
