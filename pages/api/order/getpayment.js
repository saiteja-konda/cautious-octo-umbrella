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
    const data = _.pick(payment, "vpa", "acquirer_data");
    let used = { method: "vpa" };

    return res.status(200).json({ data, used });
  };
  const cardFun = async () => {
    let result;
    let used = { method: "vpa" };

    const data = await fetch(
      `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment.id}/card`
    )
      .then((response) => response.json())
      .then((data) => (result = { data, used }));

    return res.status(200).json(result);
  };
  const walletFun = () => {
    const data = _.pick(payment, "wallet", "acquirer_data");
    let used = { method: "wallet" };
    return res.status(200).json({data, used});
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
      () => res.status(200).json(payment)
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
