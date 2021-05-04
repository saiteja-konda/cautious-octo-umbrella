import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { deepPurple, green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import clsx from "clsx";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useContext, useEffect, useState } from "react";
import shortid from "shortid";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import LinearBuffer from "../../utils/Process";
import PaymentModal from "./PaymentModal";
import CustomizedTables from "./Table";

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
  discount: {
    color: green[800],
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

  const {
    setComponent,
    selectedAddress,
    setPaymentLink,
    setOpen,
    discount,
    coupon,
    couponApplied,
  } = useContext(CheckoutContext);
  const address = selectedAddress;

  const { cart, len, userDetails, referee } = useStoreState(
    (store) => store.vox
  );
  const { getOrder } = useStoreActions((store) => store.vox);
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
  const shippingFees = 85.0;
  const subtotal = shippingFees + sum;
  const total =
    discount <= 0 ? subtotal : subtotal - (subtotal * discount) / 100;
  const discountedPrice = subtotal - (subtotal - (subtotal * discount) / 100);
  const handleConfirmation = async () => {
    setLoading(true);
    const description = "Payment for the purchase at Bask In Nature.in";
    const shortID = shortid();
    let line_items = [];
    const callbackurl = `${process.env.NEXT_PUBLIC_RAZORPAY_CALL_BACK_URL}`;
    const callbackurlwithinvoice = callbackurl + "invoice=" + shortID;
    lineItems.forEach((product) => {
      let varaint = product.variants
        .filter((o) => o.price === product.price.toString())
        .map((o) => o.label);
      let finalProd = {
        name: product.title,
        description: `${product.quantity} item of  ${product.title} - ${varaint} `,
        quantity: product.quantity,
        amount: product.price,
        currency: "INR",
        type: "invoice",
        varaint: varaint[0],
        shippingFees,
      };
      line_items.push(finalProd);
    });

    const invoice = {
      receipt: shortID,
      description,
      type: "link",
      amount: total * 100,
      callback_url: callbackurlwithinvoice,
      callback_method: "get",
    };

    axios
      .post(`/api/order/payment`, invoice)
      .then((res) => {
        const { data } = res;
        setPaymentLink(data.short_url);
      })
      .then(() => setOpen(true));

    getOrder({
      invoice,
      shippingFees,
      line_items,
      selectedAddress,
      userDetails,
      referee,
    });
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
                      ₹{shippingFees}
                    </ListItemSecondaryAction>
                  </ListItem>
                  {discount > 0 ? (
                    <ListItem>
                      <ListItemText>
                        <Typography variant="caption">Discount</Typography>
                      </ListItemText>
                      <ListItemSecondaryAction className={classes.discount}>
                        - ₹{discountedPrice}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ) : (
                    ""
                  )}
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
            onClick={() => setComponent(1)}
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
