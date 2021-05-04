import {
  Button,
  Container,
  Grid,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import clsx from "clsx";
import { useStoreActions } from "easy-peasy";
import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import { baseUrl } from "../../utils/urlConfig";
import CouponCode from "./CouponCode";
import OrderSummary from "./OrderSummary";

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: "center",
    display: "flex",
  },
  paper: {
    padding: "0px",
    color: theme.palette.text.dark,
  },
  paper2: {
    padding: "0px",
    color: theme.palette.text.dark,
    backgroundColor: "#ede7fd",
  },
  button: {
    textTransform: "none",
    margin: "5px",
  },
  review: {
    textTransform: "none",
    backgroundColor: deepPurple[800],
    color: "#fff",
  },
  primary: {
    backgroundColor: deepPurple[800],
    color: "#fff",
  },
  secondary: {
    backgroundColor: deepPurple[300],
    color: "#fff",
  },
  display: "flex",
  "& > * + *": {
    marginLeft: theme.spacing(2),
  },
}));

const StepOne = ({ invite }) => {
  useEffect(() => {
    const resetScrollFun = () => {
      window.scrollTo(0, 0);
    };
    resetScrollFun();

    if (invite !== false || null || undefined) {
      handleApply(invite);
    }
  }, []);
  const classes = useStyles();
  const {
    setComponent,
    coupon,
    setCoupon,
    couponApplied,
    setCouponApplied,
    discount,
    setDiscount,
    openFailed,
    setOpenFailed,
    openSuccess,
    setOpenSuccess,
  } = useContext(CheckoutContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenSuccess(false);
  };
  const [loading, setLoading] = useState(false);
  const { setReferee } = useStoreActions((state) => state.vox);

  const handleApply = (coupon) => {
    setLoading(true);
    // console.log(coupon.toUpperCase());
    const caseFree = coupon && coupon.toUpperCase();
    axios
      .get(`${baseUrl}/referees/${caseFree}`)
      .then((res) => {
        setDiscount(res.data.percentage);
        setReferee(res.data);
      })
      .then(() => setLoading(false))
      .then(() => setOpenSuccess(true))
      .then(() => setCouponApplied(true))
      .catch((err) => setOpenFailed(true), setLoading(false));
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <>
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Grid container direction="row" justify="center" spacing={0}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={0} className={classes.paper2}>
                <OrderSummary discount={discount} setDiscount={setDiscount} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
      <div className="container d-flex justify-content-center mt-3">
        <div></div>
      </div>
      <div className="container d-flex justify-content-center mt-3">
        {!couponApplied ? (
          <div>
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <>
                <Typography variant="caption">Have Coupon code?</Typography>
                <CouponCode
                  coupon={coupon}
                  setCoupon={setCoupon}
                  handleApply={handleApply}
                />
              </>
            )}
          </div>
        ) : (
          <Typography variant="caption">
            Coupon code Applied Successfully
          </Typography>
        )}
      </div>

      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          Invalid coupon code
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          Coupon code applied successfully
        </Alert>
      </Snackbar>
      <div className="container d-flex justify-content-center mt-3">
        <div>
          <Button
            className={clsx(classes.button, classes.secondary)}
            variant="contained"
            size="small"
            onClick={() => setComponent(0)}
          >
            Back
          </Button>
          <Button
            className={clsx(classes.button, classes.primary)}
            variant="contained"
            size="small"
            onClick={() => setComponent(2)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default StepOne;
