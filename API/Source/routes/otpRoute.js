import express from "express";
import { VerifyOtp, sendOtp } from "../controllers/otpController.js";

export const otpRoute = express.Router();

otpRoute.post("/sendOtp", sendOtp);
otpRoute.post("/verifyOtp", VerifyOtp);
