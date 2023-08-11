// components/Payment.js
import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const [amount, setAmount] = useState(1000); // Example amount in paise (₹10)
  const [order, setOrder] = useState(null);
  const { state } = useLocation();

  const createOrder = async () => {
    try {
      const response = await axios.post("/api/payment/create-order", {
        amount: amount,
      });
      setOrder(response.data);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <button onClick={createOrder}>Create Order</button>
      {order && (
        <div>
          <p>Order ID: {order.id}</p>
          {/* Include Razorpay payment integration here */}
        </div>
      )}
    </div>
  );
};

export default Payment;
