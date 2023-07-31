import mongoose from "mongoose";
const plansSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  charges: {
    type: String,
    required: true,
  },
  quality: {
    type: String,
    required: true,
  },
  resolution: {
    type: String,
    required: true,
  },
});
export const Plan = mongoose.model("Plan", plansSchema);
