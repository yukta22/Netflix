import express from "express";
import { verifyToken, verifyUser } from "../middleware/verifyJwt.js";
import { User } from "../models/users.js";
export const jwtRoute = express.Router();
// jwtRoute.get("/verify-token", verifyToken, async(req, res) => {
//   try {
//     const token = req.headers.token;

//       if (!token) {
//         return res.status(404).json({ message: "Token not found" });
//       }

//       const check = jwt.verify(token, process.env.asdasdas)
//       const findUser = await User.find({})

//       if (findUser) {

//          const newToken = jwt.sign({ userId: user?.id, email: user?.email, role: user?.role, is_verified: user?.is_verified }, process.env.JWT_TOKEN_SECRET!);

//         // res.cookie("token", newToken, { httpOnly: false });
//         res.status(200).json(newToken);}
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

jwtRoute.get("/verify-token", verifyToken, (req, res) => {
  // Token is valid, you can also return additional user information if needed
  res.json({ message: "Token valid", user: req.user });
});
