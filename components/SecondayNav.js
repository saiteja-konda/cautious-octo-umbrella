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
function SecondayNav({}) {
  const classes = useStyles();
  const categories = [
    { id: 27, name: "Skin Care", value: 27, label: "Skin Care" },
    { id: 28, name: "Hair Care", value: 28, label: "Hair Care" },
    { id: 30, name: "Baby Care", value: 30, label: "Baby Care" },
  ];
  return (
    <center>
      <Toolbar>
        <Typography component="button" className="btn btn-light">
          Skin Care
        </Typography>
        <Typography component="button" className="btn btn-light">
          Hair Care
        </Typography>
        <Typography component="button" className="btn btn-light">
          Baby Care
        </Typography>
        <Typography component="button" className="btn btn-light">
          Shop
        </Typography>
        <Typography component="button" className="btn btn-light">
          Blog
        </Typography>
        <Typography component="button" className="btn btn-light">
          About
        </Typography>
        <Typography component="button" className="btn btn-light">
          Contact
        </Typography>
      </Toolbar>
    </center>
  );
}

export default SecondayNav;
