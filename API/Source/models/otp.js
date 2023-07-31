import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
  otp: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
});

export const Otp = mongoose.model("Otp", otpSchema);
