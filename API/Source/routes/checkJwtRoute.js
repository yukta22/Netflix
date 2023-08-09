import express from "express";
import { verifyUser } from "../middleware/verifyJwt.js";

export const jwtRoute = express.Router();

jwtRoute.post("/verifyjwt", verifyUser, (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});
