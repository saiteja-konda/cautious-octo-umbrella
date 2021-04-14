import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useStoreState, useStoreActions } from "easy-peasy";
import CartMaterial from "./CartMaterial";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@material-ui/icons/RemoveCircleTwoTone";

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

export default function CartV2({ openCart, setOpenCart }) {
  const classes = useStyles();
  const theme = useTheme();
  const { cart, len } = useStoreState((state) => state.vox);
  const { removeFromCart, increase, decrease } = useStoreActions(
    (state) => state.vox
  );
  const [message, setMessage] = useState("");
  const [localPrice, setLocalPrice] = useState(
    // cart.lineItems.product.choice?.map((o) => o.price) 
    "1"
  );
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
        open={openCart}
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
          {cart.lineItems
            ?.filter((product) => product.quantity >= 1)
            .map((product) => (
              <div>
                <div style={{ padding: "15px" }}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase className={classes.image}>
                        <img
                          className={classes.img}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "contain",
                          }}
                          alt="complex"
                          src={product.image}
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography gutterBottom variant="subtitle1">
                            {product.title}
                          </Typography>
                          {/* <Typography variant="subtitle2" gutterBottom>
                  100 ml 500 ml
                </Typography> */}
                          {/* {product.options.map((o) => (
                  <Chip key={o.label} size="small" lable={`${o.label}`} />
                ))} */}
                          {product.options.map((o) => (
                            <button
                              className="badge badge-pill badge-light btn mr-1"
                              value={o.price}
                              onClick={(e) => {
                                setLocalPrice(e.target.value);
                              }}
                            >
                              {o.label}
                            </button>
                          ))}
                          <br />
                          <Typography variant="caption">Quantity</Typography>
                          <IconButton onClick={() => decrease(product)}>
                            <RemoveCircleTwoToneIcon fontSize="small" />
                          </IconButton>
                          <Typography variant="caption" color="textSecondary">
                            {product.quantity}
                          </Typography>
                          <IconButton onClick={() => increase(product)}>
                            <AddCircleTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body2"
                            onClick={() => {
                              removeFromCart(product.id);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            Remove
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle2">
                          ₹{localPrice}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            ))}

          <span
            className="text-center text-danger"
            style={{ padding: "15px", marginTop: "25px" }}
          >
            {message}
          </span>
          {/* <Total /> */}
        </>
      </Drawer>
    </div>
  );
}
