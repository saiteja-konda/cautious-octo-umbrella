import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Button, Divider, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
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
}));

export default function Total({ sum }) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ marginTop: "400px" }}>
      <CssBaseline />
      <Container
        component="main"
        className={classes.main}
        maxWidth="lg"
      ></Container>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Divider />
          <h5
            className="mt-3 mb-5"
            style={{ color: "#a5a5a5", fontSize: "14px" }}
          >
            Subtotal{" "}
            <span style={{ color: "#000", fontSize: "14px" }}> ₹ {sum}</span>
          </h5>
          <Button variant="contained" size="small" className={classes.button1}>
            Continue Shopping
          </Button>
          <Button variant="contained" size="small" className={classes.button2}>
            Checkout
          </Button>
        </Container>
      </footer>
    </div>
  );
}
