import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import NavBar from "../Navigation/NavBar";
const Success = () => {
  const router = useRouter();
  const orderDetails = router.query;
  const { razorpay_payment_id } = orderDetails;

  useEffect(() => {
    axios
      .post(`/api/order/getpayment`, { razorpay_payment_id })
      .then((res) => console.log(res.data));
  });

  return (
    <>
      <NavBar />
      <div style={{ padding: "70px 0px" }}>
        <h4 className="text-center">Order place Successfully</h4>
        <h5 className="text-center">Summary</h5>
        <hr />
        <h6 className="text-center">
          Your invoice is {orderDetails.razorpay_invoice_receipt}
        </h6>
      </div>
    </>
  );
};

export default Success;
