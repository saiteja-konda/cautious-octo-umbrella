import React, { useState } from "react";
import { useRouter } from "next/router";

import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Button, Divider, IconButton } from "@material-ui/core";
import { useStoreActions } from "easy-peasy";
import jwt_decode from "jwt-decode";

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
    padding: theme.spacing(0, 2),
    marginTop: "0px",
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
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

export default function Total({ sum, len, user }) {
  const { getAddresses, getToken } = useStoreActions((store) => store.vox);
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const pushToCheckout = () => {
    if (user) {
      setLoading(true);
      const token = localStorage.getItem("token");
      const id = jwt_decode(JSON.stringify(token)).id;
      getAddresses(id);
      router.push(`/user/checkout`);
    } else {
      window.alert("Please login to continue");
    }
  };
  return (
    <div className={classes.root}>
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
            className="mt-3 mb-2"
            style={{ color: "#a5a5a5", fontSize: "14px" }}
          >
            Subtotal{" "}
            <span style={{ color: "#000", fontSize: "14px" }}> ₹ {sum}</span>
          </h5>
          {/* <Button variant="contained" size="small" className={classes.button1}>
            Continue Shopping
          </Button> */}
          {isLoading ? (
            <button className="btn btn-dark btn-block mb-3" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          ) : (
            <button
              className="btn btn-dark btn-sm mb-3 btn-block"
              onClick={
                len > 0
                  ? () => pushToCheckout()
                  : () => window.alert("No items in your cart")
              }
              type="submit"
            >
              Checkout
            </button>
          )}
          {/* <button
            className="btn btn-sm btn-dark"
            onClick={
              len > 0
                ? () => pushToCheckout()
                : () => window.alert("No items in your cart")
            }
          >
            Checkout
          </button> */}
        </Container>
      </footer>
    </div>
  );
}
