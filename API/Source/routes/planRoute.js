import express from "express";
import { createPlan, getPlan } from "../controllers/planController.js";

export const planRoute = express.Router();

planRoute.post("/plan", createPlan);
planRoute.get("/plan", getPlan);
planRoute.put("/plan", createPlan);
planRoute.delete("/plan", createPlan);
