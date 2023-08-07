import express from "express";
import {
  createWatchHistory,
  getWatchHistory,
} from "../controllers/watchHistoryController.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyJwt.js";

export const watchhistoryRoute = express.Router();

watchhistoryRoute.post("/watchHistory", createWatchHistory);
watchhistoryRoute.post("/watchHistory/data", getWatchHistory);
