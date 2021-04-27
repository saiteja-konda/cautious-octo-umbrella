var accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
var authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const client = require("twilio")(accountSid, authToken, {
  logLevel: "debug",
});

export default (req, res) => {
  const response = client.messages
    .create({
      from: process.env.NEXT_PUBLIC_ADMIN_NUMBER,
      to: "+918688269136",
      body:
        "New Order received login and take action now https://baskinnature.ga",
    })
    .then((message) => {
      return message.sid;
    })
    .catch((err) => {
      return err;
    });

  return response;
};
