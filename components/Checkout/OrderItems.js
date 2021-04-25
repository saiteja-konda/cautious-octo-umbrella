import { Grid, List } from "@material-ui/core";
import { useStoreState } from "easy-peasy";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import {
  ButtonBase,
  Divider,
  ListItemSecondaryAction,
  ListSubheader,
  Toolbar,
  Typography,
} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { Button } from "@material-ui/core";

const useStyles2 = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#ede7fd",
  },
}));
import React from "react";
const OrderItems = () => {
  const { cart, len } = useStoreState((store) => store.vox);
  const { lineItems } = cart;
  const classes = useStyles2();
  return (
    <List
      subheader={<ListSubheader>Total Items {len}</ListSubheader>}
      className={classes.root}
    >
      {lineItems.map((item) => (
        <ListItem>
          <ButtonBase>
            <img
              src={item.image}
              style={{
                width: "58px",
                height: "58px",
                objectFit: "contain",
                marginRight: "10px",
              }}
            />
          </ButtonBase>
          <ListItemText
            primary={`${item.title}`}
            secondary={`${item.quantity} x ${item.variants
              .filter((o) => o.price === item.price.toString())
              .map((o) => o.label)}`}
          />
          <ListItemSecondaryAction>₹{item.price}</ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default OrderItems;
