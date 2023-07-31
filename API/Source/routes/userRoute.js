import express from "express";

import {
  createUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

export const userRoute = express.Router();

userRoute.post("/register/user", createUser);
userRoute.post("/login/user", getUser);
userRoute.get("/users", getAllUser);
userRoute.put("/user", updateUser);
userRoute.delete("/user", deleteUser);
