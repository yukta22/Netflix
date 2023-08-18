import express from "express";
import {
  createShow,
  getShow,
  updateShow,
  deleteShow,
  getAllShow,
  searchShow,
} from "../controllers/showController.js";
// import { upload } from "../utils/multerS3.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyJwt.js";

const showRoute = express.Router();

showRoute.get("/shows", verifyUser, getAllShow);
showRoute.get("/admin/shows", getShow);
showRoute.get("/searchShow/:query", verifyUser, searchShow);
showRoute.post("/shows", verifyAdmin, createShow);
showRoute.put("/shows", verifyAdmin, updateShow);
showRoute.delete("/shows/:id", verifyAdmin, deleteShow);

export { showRoute };
