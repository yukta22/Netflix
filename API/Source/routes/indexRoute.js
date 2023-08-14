import express from "express";
import { userRoute } from "./userRoute.js";
import { movieRoute } from "./movieRoute.js";
import { showRoute } from "./showsRoute.js";
import { planRoute } from "./planRoute.js";
import { subscriptionsRoute } from "./subscriptionRoute.js";

import { verifyAdmin } from "../middleware/verifyJwt.js";
import { watchhistoryRoute } from "./watchhistoryRoute.js";
import { otpRoute } from "./otpRoute.js";
import { jwtRoute } from "./checkJwtRoute.js";
import { paymentRoute } from "./paymentRoute.js";
import { actorRoute } from "./actorRoute.js";

export const route = express.Router();

route.use("/", showRoute);
route.use("/", planRoute);
route.use("/", subscriptionsRoute);
route.use("/", userRoute);
route.use("/", movieRoute);
route.use("/", watchhistoryRoute);
route.use("/", otpRoute);
route.use("/", jwtRoute);
route.use("/", paymentRoute);
route.use("/", actorRoute);
