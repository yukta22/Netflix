import Razorpay from "razorpay";
import { Order } from "../models/razorpay.js";
import dotenv from "dotenv";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const options = {
      amount: req.body.amount,
      currency: "INR",
      receipt: `order_${new Date().getTime()}`,
    };

    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      orderId: order.id,
      amount: req.body.amount,
      currency: "INR",
    });

    await newOrder.save();

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { createPayment };
