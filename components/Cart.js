import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Button, Container } from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import { DeleteTwoTone } from "@material-ui/icons";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
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
  const { removeFromCart, increase, decrease } = useStoreActions(
    (state) => state.vox
  );
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
  const Oops = () => {
    if (len === 0) {
      return (
        <Container maxWidth="xl">
          <Typography variant="h5" component="h1">
            Shopping Cart
          </Typography>
          {/* <div
            style={{
              display: "flex",
              // flexDirection: "column",
              justifyContent: "center",
              marginTop: "200px",
            }}
          >
            <div>
              <img
                src="https://res.cloudinary.com/saiteja/image/upload/v1617965375/bondi_media/empty_ku28ra.png"
                style={{ height: "100px", width: "100px", objectFit: "cover" }}
              />
            </div>
          </div>
          <div> */}
          <div
            className="text-danger text-center"
            style={{ marginTop: "30vh" }}
          >
            <RemoveShoppingCartIcon fontSize="large" className="mb-5" />
            <h6>Oops! Your cart is empty</h6>
          </div>
          {/* </div> */}
        </Container>
      );
    } else if (len >= 0) {
      return (
        <Container maxWidth="xl">
          <Typography variant="h5" component="h1">
            Shopping Cart
          </Typography>
          {cart?.lineItems
            ?.filter((product) => product.quantity >= 1)
            .map((product) => (
              <div key={product.id} className="row mt-4">
                <div className="col-4">
                  <img
                    src={product.image}
                    style={{
                      height: "100px",
                      width: "100px",
                      objectFit: "contain",
                      marginLeft: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div className="col-6">
                  <div className="row">
                    <div className="col-12">
                      <h6 style={{ fontSize: "14px" }}> {product.title}</h6>
                    </div>
                    <div className="col-12 mt-1">
                      <div className="product-quantity">
                        <span
                          className="product-quantity-minus"
                          onClick={() => decrease(product)}
                        ></span>
                        <input type="number" value={product.quantity} />
                        <span
                          className="product-quantity-plus"
                          onClick={() => increase(product)}
                        ></span>
                      </div>
                      <div className="col-12 mt-1"></div>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <h5 style={{ fontSize: "14px" }}>₹{product.price}</h5>
                  <IconButton
                    onClick={() => {
                      removeFromCart(product.id);
                    }}
                  >
                    <DeleteTwoTone color="error" size="small" />
                  </IconButton>
                </div>
              </div>
            ))}
        </Container>
      );
    }
  };
  const RenderCart = Oops();
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
        {RenderCart}
      </Drawer>
    </div>
  );
}
