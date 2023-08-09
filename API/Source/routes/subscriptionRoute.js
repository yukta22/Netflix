import express from "express";
import {
  createSubscription,
  getsubscription,
  getsubscriptiondata,
  updatesubscription,
  deletesubscription,
} from "../controllers/subscriptionController.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyJwt.js";

export const subscriptionsRoute = express.Router();

subscriptionsRoute.post("/subscriptions", createSubscription);
subscriptionsRoute.post("/subscriptions/:id", getsubscriptiondata);
subscriptionsRoute.get("/subscriptions", getsubscription);
subscriptionsRoute.put("/subscriptions", updatesubscription);
subscriptionsRoute.delete("/subscriptions/:id", deletesubscription);
