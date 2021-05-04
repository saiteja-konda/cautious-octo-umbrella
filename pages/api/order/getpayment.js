const axios = require("axios");

const _ = require("lodash");
const Razorpay = require("razorpay");
export default async (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
  });
  const body = req.body;
  const payment = await instance.payments.fetch(body.razorpay_payment_id);
  const method = _.pick(payment, "method").method;

  if (method === "card") {
    let result;
    let used = { method: "card" };
    const data = await fetch(
      `https://${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET}@api.razorpay.com/v1/payments/${payment.id}/card`
      )
      .then((response) => response.json())
      .then((data) => {
        return (result = {
          ...body.all,
          shippingAddress: body.all.selectedAddress,
          data,
          method: used.method,
        });
      });
      
      return res.status(200).json(result);
      
    } else if (method === "upi") {
    const pick = _.pick(payment, "vpa", "acquirer_data");
    const { acquirer_data } = pick;
    const data = acquirer_data;
    data.vpa = pick.vpa;
    let used = { method: "vpa" };
    let other = {
      ...body.all,
      used,
      data,
      shippingAddress: body.all.selectedAddress,
      method: used.data,
    };
    return res.status(200).json(other);
  } else if ("wallet") {
    const pick = _.pick(payment, "wallet", "acquirer_data");
    const { acquirer_data, wallet } = pick;
    const data = acquirer_data;
    data.wallet = wallet;
    let used = { method: "wallet" };
    let other = {
      ...body.all,
      used,
      data,
      shippingAddress: body.all.selectedAddress,
      method: used.data,
    };
    return res.status(200).json(other);
  } else {
    return res.status(402).json(payment);
  }
};
