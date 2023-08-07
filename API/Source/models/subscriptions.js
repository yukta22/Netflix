import mongoose from "mongoose";
const subscriptionsSchema = mongoose.Schema({
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
});
export const Subscription = mongoose.model("Subscription", subscriptionsSchema);
