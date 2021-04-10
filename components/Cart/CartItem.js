import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IconButton } from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@material-ui/icons/RemoveCircleTwoTone";

import { useStoreState, useStoreActions } from "easy-peasy";

const useStyles = makeStyles((theme) => ({}));

export default function CartItem({ product }) {
  const classes = useStyles();
  const { removeFromCart, increase, decrease } = useStoreActions(
    (state) => state.vox
  );
  return (
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
                <Typography variant="subtitle2" gutterBottom>
                 100 ml 500 ml
                </Typography>
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
              <Typography variant="subtitle2">₹{product.price}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
