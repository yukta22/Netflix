import express from "express";
import {
  validateTokenMiddleware,
  verifyUser,
} from "../middleware/verifyJwt.js";

export const jwtRoute = express.Router();

jwtRoute.get("/validate-token", validateTokenMiddleware, (req, res) => {
  try {
    res.json({ valid: true });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
