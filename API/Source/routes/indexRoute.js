import express from "express";
import { userRoute } from "./userRoute.js";
import { movieRoute } from "./movieRoute.js";
import { showRoute } from "./showsRoute.js";
import { planRoute } from "./planRoute.js";
import { subscriptionsRoute } from "./subscriptionRoute.js";

import { verifyAdmin } from "../middleware/verifyJwt.js";

export const route = express.Router();

route.use("/", showRoute);
// route.use(verifyAdmin);
route.use("/", planRoute);
route.use("/", subscriptionsRoute);
route.use("/", userRoute);
// route.use("/", verifyAdmin, movieRoute);
route.use("/", movieRoute);
