import { key_id, key_secret } from "../../../components/Checkout/keys";
const _ = require("lodash");
const Razorpay = require("razorpay");
const axios = require("axios");
const request = require("request");

export default async (req, res) => {
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
  });
  const body = req.body;
  const payment = await instance.payments.fetch(body.razorpay_payment_id);
  // const payment = await instance.payments.fetch("pay_H2UMOFpj8K8gP5");
  const method = _.pick(payment, "method").method;

  const upiFun = () => {
    const pick = _.pick(payment, "vpa", "acquirer_data");
    const { acquirer_data } = pick;
    const data = acquirer_data;
    data.vpa = pick.vpa;
    let used = { method: "vpa" };
    let other = {
      used,
      data,
    };
    return res.status(200).json(other);
  };
  const walletFun = () => {
    const pick = _.pick(payment, "wallet", "acquirer_data");
    const { acquirer_data, wallet } = pick;
    const data = acquirer_data;
    data.wallet = wallet;
    let used = { method: "wallet" };
    let other = {
      used,
      data,
    };
    return res.status(200).json(other);
  };

  const cardFun = async () => {
    let result;
    let used = { method: "card" };

    const data = await fetch(
      `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment.id}/card`
    )
      .then((response) => response.json())
      .then((data) => (result = { data, used }));

    return res.status(200).json(result);
  };
  switch (method) {
    case "upi":
      upiFun();
      break;
    case "card":
      cardFun();
      break;
    case "wallet":
      walletFun();
      break;
    default:
      () => res.status(200).json(payment);
      break;
  }
};

// const CardDetails = request(
//   `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment.id}/card`,
//   function (error, response, body) {
//     let result = [];
//     let used = { method: "card" };
//     result.push(body);
//     result.push(used);
//     return response;
//   }
// );
