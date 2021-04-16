import { Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";

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
  toolbar: {
    overflowX: "scroll",
  },
});
function SecondayNav({ categories }) {
  const classes = useStyles();
  const start = [{ id: "x", name: "Shop by concern" }];
  const end = [
    { id: "y", name: "About us" },
    { id: "z", name: "Contact us" },
  ];
  const dyanmic = [...start, ...categories, ...end];
  return (
    <Toolbar className={classes.toolbar}>
      {dyanmic.map((o) => (
        <Typography
          key={o.id}
          component="button"
          // variant="caption"
          className="btn btn-light"
          style={{ fontSize: "14px", whiteSpace: "nowrap" }}
          fullWidth
        >
          {o.name}
        </Typography>
      ))}
    </Toolbar>
  );
}

export default SecondayNav;
