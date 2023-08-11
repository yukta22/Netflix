import express from "express";
import { createPayment } from "../controllers/paymentController.js";

export const paymentRoute = express.Router();

paymentRoute.post("/payment", createPayment);
