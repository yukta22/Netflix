import express from "express";
import {
  createShow,
  getShow,
  updateShow,
  deleteShow,
} from "../controllers/showController.js";
// import { upload } from "../utils/multerS3.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyJwt.js";

const showRoute = express.Router();

showRoute.get("/shows", verifyUser, getShow);
showRoute.post("/shows", verifyAdmin, createShow);
showRoute.put("/shows", updateShow);
showRoute.delete("/shows", deleteShow);

export { showRoute };
