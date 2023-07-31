import { Otp } from "../models/otp";
import * as twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const YOUR_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const YOUR_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(YOUR_ACCOUNT_SID, YOUR_AUTH_TOKEN);

const initialVerificationToken = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  try {
    const verification = await client.verify.services("").verifications.create({
      to: phoneNumber,
      channel: "sms", // or 'call' for voice verification
    });

    await Otp.create({
      sid: verification.sid,
      phoneNumber: phoneNumber,
    });

    res.status(200).json({ success: true, message: "Verification initiated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Verification failed." });
  }
};
