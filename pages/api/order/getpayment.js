import { key_id, key_secret } from "../../../components/Checkout/keys";

const Razorpay = require("razorpay");

export default async (req, res) => {
  const body = req.body;
  var instance = new Razorpay({
    key_id: key_id,
    key_secret: key_secret,
  });
    const payment = await instance.payments.fetch(body.razorpay_payment_id);
  res.status(200).json(payment);
};
