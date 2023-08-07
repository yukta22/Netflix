import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userProfile: {
    type: String,
  },
  contactNumber: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "basic"],
    default: "basic",
  },
});
export const User = mongoose.model("User", userSchema);
