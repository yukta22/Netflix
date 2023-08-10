import { Router } from "express";
import { Otp, validateOtp } from "../models/otp.js";
const router = Router();
import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendOtp = async (req, res) => {
  const { error } = validateOtp(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const phoneNumber = `+91${req.body.phoneNumber}`;
  const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
  console.log(otp);
  try {
    // Store OTP in MongoDB
    const newOTP = new Otp({
      phoneNumber: phoneNumber,
      otp: otp.toString(),
      expiration: new Date(Date.now() + 10 * 60 * 1000), // Expiration time: 10 minutes
    });
    await newOTP.save();

    // Send OTP via Twilio
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: "+13613096023",
      to: phoneNumber,
    });

    console.log(message.sid);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

const VerifyOtp = async (req, res) => {
  console.log(req.body);
  const phoneNumber = `+91${req.body.phoneNumber}`;
  const enteredOTP = req.body.enteredOTP;

  try {
    const storedOTP = await Otp.findOne({
      phoneNumber: phoneNumber,
      otp: enteredOTP,
      expiration: { $gt: new Date() },
    });
    console.log(storedOTP);
    if (storedOTP) {
      await Otp.deleteOne({ phoneNumber: phoneNumber });
      res.send("OTP verified successfully");
    } else {
      // Incorrect OTP or expired
      res.send("Incorrect OTP");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error verifying OTP");
  }
};

export { sendOtp, VerifyOtp };
