import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import shortid from "shortid";

import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CheckoutContext } from "../../lib/context/CheckoutContext";
import CustomizedTables from "./Table";
import clsx from "clsx";
import { deepPurple } from "@material-ui/core/colors";
import { useStoreState } from "easy-peasy";
import LinearBuffer from "../../utils/Process";

import PaymentModal from "./PaymentModal";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.dark,
  },
  headingPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.dark,
  },
  button: {
    textTransform: "none",
    margin: "5px",
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

const StepTwo = () => {
  useEffect(() => {
    const resetScrollFun = () => {
      window.scrollTo(0, 0);
    };
    resetScrollFun();
  }, []);
  const classes = useStyles();

  const { setComponent, selectedAddress, setPaymentLink, setOpen } = useContext(
    CheckoutContext
  );
  const address = selectedAddress;

  const { cart, len } = useStoreState((store) => store.vox);
  const [isLoading, setLoading] = useState(false);
  const { lineItems } = cart;
  const cartTotalCounter = () => {
    let count = 0;
    cart?.lineItems
      ?.filter((p) => p.quantity >= 1)
      .forEach((e) => {
        count = e.price * e.quantity + count;
      });
    return count;
  };
  const sum = cartTotalCounter();
  const shppingFees = 85.0;
  const discount = 0.0;
  const tax = 0.0;
  const total = shppingFees + sum + tax - discount;
  const handleConfirmation = () => {
    setLoading(true);
    const description = "Payment for the purchase at Bask In Nature.in";
    let line_items = [];
    lineItems.forEach((product) => {
      let finalProd = {
        name: product.title,
        description: `${product.quantity} item of ${product.title}`,
        quantity: product.quantity,
        amount: product.price + shppingFees * 100,
        currency: "INR",
        type: "invoice",
      };
      line_items.push(finalProd);
    });

    const invoice = {
      receipt: shortid(),
      description,
      type: "link",
      amount: (sum + shppingFees) * 100,
      callback_url: "http://localhost:3000/user/checkout/?clan=SdRoLKRaD&",
      callback_method: "get",
      // line_items,
    };

    axios
      .post(`/api/order/payment`, invoice)
      .then((res) => {
        const { data } = res;
        const { receipt } = invoice;
        setPaymentLink(data.short_url);
      })
      .then(() => setOpen(true));

    console.log(invoice);
  };
  return (
    <>
      <Container maxWidth="md">
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.headingPaper}>
                Confirm Your Order
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={0} className={classes.paper}>
                <Typography gutterBottom variant="h6" component="h4">
                  Shipping Address
                </Typography>
                <Typography gutterBottom variant="body2" component="h4">
                  {address.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${address.fullName}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${address.phoneNumber}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${address.line1}, ${address.line2}`}{" "}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`${address.state},${" "}${address.city},${" "}${
                    address.zipcode
                  }`}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper elevation={0} className={classes.paper}>
                <CustomizedTables />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={0} className={classes.paper}>
                <Divider />
                <List className={classes.root}>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="caption">Subtotal</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>₹{sum}</ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="caption">
                        Shipping Chargers
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      ₹{shppingFees}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Typography variant="caption">Tax</Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>₹0.00</ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText>
                      <Typography variant="subtitle1" component="b">
                        Total
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <b>₹{total}</b>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
                <div className={isLoading ? "d-block" : "d-none"}>
                  <LinearBuffer />
                </div>
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
            onClick={handleConfirmation}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </div>
      </div>
      <PaymentModal />
    </>
  );
};

export default StepTwo;
