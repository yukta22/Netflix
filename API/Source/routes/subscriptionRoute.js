import express from "express";
import {
  createSubscription,
  getsubscription,
  updatesubscription,
  deletesubscription,
} from "../controllers/subscriptionController.js";

export const subscriptionsRoute = express.Router();

subscriptionsRoute.post("/subscriptions", createSubscription);
subscriptionsRoute.get("/subscriptions", getsubscription);
subscriptionsRoute.put("/subscriptions", updatesubscription);
subscriptionsRoute.delete("/subscriptions", deletesubscription);
