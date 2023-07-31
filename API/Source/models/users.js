import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userPassword: {
    type: String,
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
