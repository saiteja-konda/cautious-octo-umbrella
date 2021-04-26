import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Invoice from "./Invoice";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "#000",
  },
}));

const Success = () => {
  const router = useRouter();
  const orderDetails = router.query;
  const { razorpay_payment_id } = orderDetails;
  const { setComponent } = useContext(CheckoutContext);
  const { getPaymentDetails } = useStoreActions((store) => store.vox);
  const { ResetCart } = useStoreActions((store) => store.vox);

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);

  function ShowBackDrop() {
    return (
      <div>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
  useEffect(() => {
    ResetCart();
    setComponent(3);
    axios.post(`/api/order/getpayment`, { razorpay_payment_id }).then((res) => {
      const { data } = res;
      const paymentDetails = {
        razorpay_payment_id,
        paymentmethod: data,
      };
      getPaymentDetails(paymentDetails);
      setOpen(false);
      setShowInvoice(true);
      console.log(all);
    });
  }, []);

  const { order } = useStoreState((store) => store.vox);

  const orderDetails1 = _.pick(order, "orderDetails");
  const all = _.merge(orderDetails1.orderDetails, order.paymentDetails);
  const {
    userDetails,
    paymentmethod,
    line_items,
    shppingFees,
    invoice,
    selectedAddress,
  } = all;
  let address = selectedAddress;

  return (
    <>
      <ShowBackDrop />
      {showInvoice ? (
        <Invoice
          userDetails={userDetails}
          paymentmethod={paymentmethod}
          line_items={line_items}
          shppingFees={shppingFees}
          invoice={invoice}
          address={address}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Success;
