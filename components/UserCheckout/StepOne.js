import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar, Grid, Paper, Container, Button } from "@material-ui/core";
import NavBar from "../Navigation/NavBar";
import OrderSummary from "./OrderSummary";
import StickyFooter from "../../components/StickyFooter";
import { useStoreState } from "easy-peasy";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import green from "@material-ui/core/colors/green";
import deepPurple from "@material-ui/core/colors/deepPurple";
import blue from "@material-ui/core/colors/blue";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
  },
  paper: {
    padding: "0px",
    color: theme.palette.text.dark,
  },
  paper2: {
    padding: "0px",
    color: theme.palette.text.dark,
    backgroundColor: "#ede7fd",
  },
  button: {
    textTransform: "none",
    margin: "5px",
  },
  review: {
    textTransform: "none",
    backgroundColor: deepPurple[800],
    color: "#fff",
  },
  primary: {
    backgroundColor: deepPurple[800],
    color: "#fff",
  },
  secondary: {
    backgroundColor: deepPurple[300],
    color: "#fff",
  },
}));

const StepOne = () => {
  useEffect(() => {
    const resetScrollFun = () => {
      window.scrollTo(0, 0);
    };
    resetScrollFun();
  }, []);
  const classes = useStyles();
  const { userDetails, cart, addresses } = useStoreState((store) => store.vox);
  const { setComponent, selectedAddress, setSelectedAddress } = useContext(
    CheckoutContext
  );

  return (
    <>
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container direction="row" justify="center" spacing={0}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={0} className={classes.paper2}>
                <OrderSummary />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className="container d-flex justify-content-center mt-3">
        <div>
          <Button
            className={clsx(classes.button, classes.secondary)}
            variant="contained"
            size="small"
            onClick={() => setComponent(0)}
          >
            Back
          </Button>
          <Button
            className={clsx(classes.button, classes.primary)}
            variant="contained"
            size="small"
            onClick={() => setComponent(2)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default StepOne;
