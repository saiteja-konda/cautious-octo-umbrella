const Razorpay = require("razorpay");

export default async (req, res) => {
  const body = req.body;
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
  });
  const invoice = await instance.invoices.create(body);
  res.status(200).json(invoice);
};
