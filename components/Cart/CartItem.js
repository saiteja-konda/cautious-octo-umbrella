import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IconButton, Select } from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@material-ui/icons/RemoveCircleTwoTone";

import { useStoreActions } from "easy-peasy";

const useStyles = makeStyles((theme) => ({}));

export default function CartItem({ product }) {
  const classes = useStyles();
  const { removeFromCart, increase, decrease, changePrice } = useStoreActions(
    (state) => state.vox
  );
  const [localPrice, setLocalPrice] = useState(product.price);
  const priceChanger = (e) => {
    setLocalPrice(e.target.value);
  };

  const typesRaw = JSON.parse(product.types.options);
  const types = typesRaw.filter((o) => o.label != null);

  useEffect(() => {
    changePrice({
      id: product.id,
      newPrice: parseInt(localPrice),
    });
  }, [localPrice]);
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
                  objectFit: "cover",
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
                {product.options?.map((o) => (
                  <button
                    className={
                      o.price === localPrice
                        ? "badge badge-pill badge-info btn mr-1"
                        : "badge badge-pill badge-light btn mr-1"
                    }
                    ley={o.price}
                    value={o.price}
                    onClick={priceChanger}
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
                <br />
                {types.length > 0 ? (
                  <>
                    <Typography variant="caption">Choose option </Typography>
                    <select
                      onChange={(e) => {
                        // voxStore Action
                      }}
                    >
                      {types.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  ""
                )}
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
