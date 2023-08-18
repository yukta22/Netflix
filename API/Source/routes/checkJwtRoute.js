import express from "express";
import { verifyToken, verifyUser } from "../middleware/verifyJwt.js";
import { User } from "../models/users.js";
export const jwtRoute = express.Router();

jwtRoute.get("/verify-token", verifyToken, (req, res) => {
  // Token is valid, you can also return additional user information if needed
  res.json({ message: "Token valid", user: req.user });
});
