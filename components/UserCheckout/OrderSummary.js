import { useStoreState } from "easy-peasy";
import React from "react";
import NavBar from "../Navigation/NavBar";

import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemSecondaryAction,
  Toolbar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";

import OrderItems from "../Checkout/OrderItems";

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#ede7fd",
    color: "#000",
  },
}));
const OrderSummary = () => {
  const { cart, len } = useStoreState((store) => store.vox);
  const { lineItems } = cart;
  const classes = useStyles2();
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

  return (
    <>
      <Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          item
        >
          <OrderItems />
          <List className={classes.root}>
            <Divider />
            <ListItem>
              <ListItemText>
                <Typography variant="caption">Subtotal</Typography>
              </ListItemText>
              <ListItemSecondaryAction>₹{sum}</ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Typography variant="caption">Shipping Chargers</Typography>
              </ListItemText>
              <ListItemSecondaryAction>₹{shppingFees}</ListItemSecondaryAction>
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
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSummary;
