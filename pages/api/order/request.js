var request = require("request");
const axios = require("axios");

const { key_id, key_secret } = require("../../../components/Checkout/keys");

// request(
//   `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/pay_H2U7FwDJQQjxvZ`,
//   function (error, response, body) {
//     console.log("Response:", body);
//     return response.status(200).json(body);
//   }
// );
export default async (req, res) => {
    const payment_id = req.body
    // var data = await axios
    //   .get(
    // `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment_id}`
    //   )
    //   .then((res) => {
    //     console.log(JSON.stringify(res.data));
    //     data = res.data;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  const data = await fetch(
    `https://${key_id}:${key_secret}@api.razorpay.com/v1/payments/${payment_id}`
  );

  res.status(200).json(data);
};
