import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStoreState, useStoreActions } from "easy-peasy";
import { DeleteTwoTone } from "@material-ui/icons";
import CartMaterial from "./CartMaterial";
import Total from "./Total";
const drawerWidth = 375;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
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

export default function Cart({ openCart, setOpenCart }) {
  const classes = useStyles();
  const theme = useTheme();
  const { cart, len } = useStoreState((state) => state.vox);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (len == 0) {
      setMessage("Oops! Your Cart is Empty");
    } else {
      setMessage("");
    }
  });
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={true}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={() => setOpenCart(false)}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <>
          <span
            className="text-center"
            style={{ padding: "15px", marginTop: "25px" }}
          >
            Your Shopping Cart
          </span>
          <CartMaterial />

          <span
            className="text-center text-danger"
            style={{ padding: "15px", marginTop: "25px" }}
          >
            {message}
          </span>
          <Total sum={sum}/>
        </>
      </Drawer>
    </div>
  );
}
