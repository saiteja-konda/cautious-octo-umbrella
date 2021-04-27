const nodemailer = require("nodemailer");

export default async (req, res) => {
  const body = req.body;
  console.log(body);

  const mailOptions = {
    from: "konda.saitej@yahoo.in",
    to: "kondasaitej@protonmail.com",
    subject: `Order ${body.id} received !!`,
    text: "test run",
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Order Received</title></head><style>.body{margin:15px;margin-top:20px}</style><body class="body"><h1>Order Received</h1><p>Dear <b>${
      body.fullName
    }</b></p><p>Thank you for shopping with us your order <b> ${
      body.id
    } </b/> has been received successfully and you will receive a confirmation shortly</p><hr /><h2>Order details</h2><ul>${
      body.line_items
    }</ul><h3>Total - ₹${body.amount / 100}</h3></body></html>`,
  };
  const senderMail = process.env.NEXT_PUBLIC_TO_MAIL;
  const password = process.env.NEXT_PUBLIC_PASSWORD;

  var emailTransporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: false,
    auth: {
      user: senderMail,
      pass: password,
    },
    debug: false,
    logger: true,
  });

  emailTransporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info.response);
    }
    return res.status(200).json(info);
  });
};
