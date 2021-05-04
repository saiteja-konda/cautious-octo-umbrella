import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { useStoreState } from "easy-peasy";
import React from "react";
import OrderItems from "../Checkout/OrderItems";

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#ede7fd",
    color: "#000",
  },
 
}));
const OrderSummary = ({ discount, setDiscount }) => {
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
  const shippingFees = 85.0;
  const subtotal = shippingFees + sum;
  const total = 
    discount <= 0 ? subtotal : subtotal - (subtotal * discount) / 100;
  const discountedPrice = subtotal - (subtotal - (subtotal * discount) / 100);
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
              <ListItemSecondaryAction>₹{shippingFees}</ListItemSecondaryAction>
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
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSummary;
