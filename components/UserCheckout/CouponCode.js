import { Button, Typography } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import RedeemIcon from "@material-ui/icons/Redeem";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 400,
    backgroundColor: deepPurple[200],
  },
 
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    // padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  apply: {
    textTransform: "none",
  },
  button: {},
}));

export default function CouponCode({ setCoupon, coupon, handleApply,  }) {
  const classes = useStyles();

  return (
    <Paper component="form" elevation={0} className={classes.root}>
      <RedeemIcon />
      <InputBase
        className={classes.input}
        placeholder="Enter Coupon Code"
        inputProps={{ "aria-label": "Coupon Code" }}
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
      />
      <Button
        className={classes.iconButton}
        aria-label="coupon"
        onClick={() => handleApply(coupon)}
      >
        <Typography className={classes.apply} variant="capiton">
          Apply
        </Typography>
      </Button>
    </Paper>
  );
}
