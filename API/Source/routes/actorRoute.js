import express from "express";
import { createActor, getActor } from "../controllers/actorController.js";

export const actorRoute = express.Router();

actorRoute.post("/createActor", createActor);
actorRoute.get("/getActor", getActor);
