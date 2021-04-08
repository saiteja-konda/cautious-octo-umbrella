import { makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";

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
function SecondayNav() {
  const classes = useStyles();

  return (
    <center>
      <Toolbar>
        <Typography variant="p" component="button" className="btn btn-light">
          Shop
        </Typography>
        <Typography variant="p" component="button" className="btn btn-light">
          Blog
        </Typography>
        <Typography variant="p" component="button" className="btn btn-light">
          About Us
        </Typography>
        <Typography variant="p" component="button" className="btn btn-light">
          Contact Us
        </Typography>
      </Toolbar>
    </center>
  );
}

export default SecondayNav;
