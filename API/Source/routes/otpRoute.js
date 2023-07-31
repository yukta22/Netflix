import express from "express";

export const otpRoute = express.Router();

otpRoute.post("/verify", initialVerification);
otpRoute.post("/verify/confirm", confirmVerification);
