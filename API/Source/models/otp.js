import mongoose from "mongoose";
import Joi from "joi";

const otpSchema = new mongoose.Schema({
  phoneNumber: String,
  otp: String,
  expiration: Date,
});

export const Otp = mongoose.model("Otp", otpSchema);

const otpJoiSchema = Joi.object({
  phoneNumber: Joi.string().required(),
});

// Validate OTP data using Joi schema
export const validateOtp = (otpData) => {
  return otpJoiSchema.validate(otpData);
};
