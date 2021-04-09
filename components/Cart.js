import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Container } from "@material-ui/core";
import { useStoreState } from "easy-peasy";
import { DeleteTwoTone } from "@material-ui/icons";

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
  const { cart } = useStoreState((state) => state.vox);
  const cartTotalCounter = () => {
    let count = 0;
    cart.forEach((e) => {
      count = e.price + count;
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
        <Container maxWidth="xl">
          <Typography variant="h5" component="h1">
            Shopping Cart
          </Typography>
          {cart?.map((product) => (
            <div className="row mt-4">
              <co1 className="col-4">
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
              </co1>
              <co1 className="col-6">
                <div className="row">
                  <div className="col-12">
                    <h6 style={{ fontSize: "14px" }}> {product.title}</h6>
                  </div>
                  <div className="col-12 mt-1">
                    <div className="product-quantity">
                      <span className="product-quantity-minus"></span>
                      <input type="number" value="0" />
                      <span className="product-quantity-plus"></span>
                    </div>
                  </div>
                </div>
              </co1>
              <co1 className="col-2">
                <h5 style={{ fontSize: "14px" }}>₹{product.price}</h5>
                <IconButton>
                  <DeleteTwoTone color="error" size="small" />
                </IconButton>
              </co1>
            </div>
          ))}
          <h5 className="mt-5"></h5>
          <Divider />
          <h5 className="mt-3" style={{ color: "#a5a5a5", fontSize: "14px" }}>
            Subtotal{" "}
            <span style={{ color: "#000", fontSize: "14px" }}> ₹ {sum}</span>
          </h5>
          <Button variant="contained" size="small" className={classes.button1}>
            Continue Shopping
          </Button>
          <Button variant="contained" size="small" className={classes.button2}>
            Checkout
          </Button>
        </Container>
      </Drawer>
    </div>
  );
}
