import mongoose from "mongoose";
const subscriptionsSchema = mongoose.Schema({
  startDate: {
    type: Date,
    default: Date.now(),
    // required: true,
  },
  endDate: {
    type: Date,
    default: Date.now(),

    // required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plan",
  },
  abc: {
    type: String,
  },
});
export const Subscription = mongoose.model("Subscription", subscriptionsSchema);
