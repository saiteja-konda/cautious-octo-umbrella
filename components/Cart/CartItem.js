import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IconButton } from "@material-ui/core";
import AddCircleTwoToneIcon from "@material-ui/icons/AddCircleTwoTone";
import RemoveCircleTwoToneIcon from "@material-ui/icons/RemoveCircleTwoTone";

import { useStoreActions } from "easy-peasy";
import PillGroup from "../Product/PillGroup";
const useStyles = makeStyles((theme) => ({}));

export default function CartItem({ product }) {
  const classes = useStyles();
  const { removeFromCart, increase, decrease, changePrice } = useStoreActions(
    (state) => state.vox
  );

  // const typesRaw = JSON.parse(product.types.options);
  // const types = typesRaw.filter((o) => o.label != null);
  const [localPrice, setLocalPrice] = useState(product.choice.price);
  const [price, setPrice] = useState(product.choice);
  const { types } = product;
  const filtedTypes = types.filter((o) => o.label && o.value != null);
  const [selectedType, setSelectedType] = useState(
    filtedTypes.length > 0 ? product.types[0] : product.type
  );
  const priceChanger = (price) => {
    setPrice(price);
    setLocalPrice(price.price);
    console.log(price);
  };
  const onTypePillSelect = (type) => {
    setSelectedType(type);
  };

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
                <PillGroup
                  items={product.variants}
                  valueProperty="price"
                  onPillSelect={priceChanger}
                  selectedPill={price}
                />
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
                <div>
                  {filtedTypes.length > 0 ? (
                    // null
                    <div className="">
                      <div>
                        <Typography variant="caption">Choose option</Typography>
                        <br />
                        <PillGroup
                          items={types}
                          onPillSelect={onTypePillSelect}
                          selectedPill={selectedType}
                          // setSelected={setSelected}
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
              <Typography variant="subtitle2">₹{localPrice}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
