import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "../../lib/context/CheckoutContext";
import { baseUrl } from "../../utils/urlConfig";
import NavBar from "../Navigation/NavBar";
import Invoice from "./Invoice";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Success = () => {
  const router = useRouter();
  const orderDetails = router.query;
  const { razorpay_payment_id, razorpay_invoice_receipt } = orderDetails;
  const { setComponent, response } = useContext(CheckoutContext);
  const { order } = useStoreState((store) => store.vox);
  const { ResetCart, ResetOrder, getResponse } = useStoreActions(
    (store) => store.vox
  );

  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const orderDetails1 = _.pick(order, "orderDetails");
  const all = _.merge(orderDetails1.orderDetails, order.paymentDetails);
  const { referee } = order.orderDetails;
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

  const myFun = (data) => {
    getResponse(data);
    setComponent(4);
    setOpen(false);
    sendNotification(data);
    ResetOrder();
  };
  useEffect(() => {
    ResetCart();
    setComponent(3);
    makeGetRequest();

    async function makeGetRequest() {
      let res = await axios.post(`/api/order/getpayment`, {
        razorpay_payment_id,
        all,
        razorpay_invoice_receipt,
      });

      const odr = all.invoice.receipt;
     referee.orders?.push(odr);

      
      axios.put(`${baseUrl}/referees/${referee.id}`, referee);
      let data = res.data;

      let res2 = await axios
        .post(`${baseUrl}/orders/${razorpay_invoice_receipt}`, data)
        .then((res) => {
          myFun(res.data);
          sessionStorage.setItem("receivedOrder", true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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
