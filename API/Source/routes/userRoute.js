import express from "express";

import {
  createUser,
  getUser,
  getUsers,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { verifyAdmin } from "../middleware/verifyJwt.js";

export const userRoute = express.Router();

userRoute.post("/register/user", createUser);
userRoute.post("/login/user", getUser);
userRoute.get("/users", getAllUser);
userRoute.get("/getUsers", getUsers);
userRoute.put("/user/:id", verifyAdmin, updateUser);
userRoute.delete("/user/:id", verifyAdmin, deleteUser);
