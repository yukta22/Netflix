import * as Twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const YOUR_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const YOUR_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFY_SID;

// const client = Twilio(YOUR_ACCOUNT_SID, YOUR_AUTH_TOKEN);

const sendotp = async (otp, phoneNumber) => {
  //   client.messages
  //     .create({
  //       body: "Hello from twilio-node",
  //       to: "+1 361 309 6023",
  //       from: "+12345678901", // From a valid Twilio number
  //     })
  //     .then((message) => console.log(message.sid))
  //     .done();
};

export { sendotp };
