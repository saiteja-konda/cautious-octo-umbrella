import { key_id, key_secret } from "../../../components/Checkout/keys";
const _ = require("lodash");
const Razorpay = require("razorpay");
const axios = require("axios");
const request = require("request");

export default async (req, res) => {
  var instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
  const body = req.body;
  const payment = await instance.payments.fetch(body.razorpay_payment_id);
  const method = _.pick(payment, "method").method;

  const upiFun = () => {
    return res.status(200).json("Upi payment");
  };
  const cardFun = async () => {
    const CardDetails = request(
      `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment.id}/card`,
      function (error, response, body) {
        return body;
      }
    );

    // const data = await fetch(
    // `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment.id}/card`
    // );
    return res.status(200).json(CardDetails);
  };
  const walletFun = () => {
    return res.status(200).json("Wallet payment");
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
      break;
  }
};
