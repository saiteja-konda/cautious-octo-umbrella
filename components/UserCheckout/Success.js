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
import { baseUrl } from "../../utils/urlConfig";
import NavBar from "../Navigation/NavBar";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    // backgroundColor: "#000",
  },
}));

const Success = () => {
  const router = useRouter();
  const orderDetails = router.query;
  const { razorpay_payment_id, razorpay_invoice_receipt } = orderDetails;
  const { setComponent } = useContext(CheckoutContext);
  const { order, userDetails } = useStoreState((store) => store.vox);
  const { ResetCart, ResetOrder } = useStoreActions((store) => store.vox);

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [response, setResponse] = useState({});
  function ShowBackDrop() {
    return (
      <div>
        <NavBar />
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
      const orderDetails1 = _.pick(order, "orderDetails");
      const all = _.merge(orderDetails1.orderDetails, order.paymentDetails);
      let {
        userDetails,
        line_items,
        shippingFees,
        invoice,
        selectedAddress,
      } = all;
      const status = "PENDING";
      const serverObj = {
        id: razorpay_invoice_receipt,
        data: data.data,
        method: data.used.method,
        userDetails,
        line_items,
        shippingFees,
        invoice,
        shippingAddress: selectedAddress,
        userId: userDetails && userDetails.username,
        status,
        razorpay_payment_id,
      };
      axios
        .post(`${baseUrl}/orders/${razorpay_invoice_receipt}`, serverObj)
        .then((res) => {
          setOpen(false);
          setResponse(res.data);
          sendNotification(res);
          ResetOrder();
          setShowInvoice(true);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, []);

  const sendNotification = (res) => {
    const { invoice, userDetails, line_items, id } = res.data;
    const extract = _.map(line_items, "description");
    const list = extract.map((o) => "<li>" + o + "</li>");
    const itemsList = list.join(" ");
    const Notified = sessionStorage.getItem("notified");
    if (Notified === null) {
      axios
        .post("/api/order/notification", {
          amount: invoice.amount,
          fullName: userDetails.fullName,
          line_items: itemsList,
          id,
        })
        .then(() => sessionStorage.setItem("notified", true));
    }
  };
  const useInvoice = () => {
    switch (showInvoice) {
      case true: {
        return (
          <Invoice
            userDetails={response.userDetails}
            paymentmethod={response.data}
            method={response.method}
            line_items={response.line_items}
            shippingFees={response.shippingFees}
            invoice={response.invoice}
            address={response.shippingAddress}
          />
        );
      }
      case false:
        return <ShowBackDrop />;
      default:
        return <ShowBackDrop />;
    }
  };
  const RenderInvoice = useInvoice();

  return <>{RenderInvoice}</>;
};

export default Success;
