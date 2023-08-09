import mongoose from "mongoose";
import Joi from "joi";

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

const userValidationSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string().min(8).required(),
  userProfile: Joi.string(),
  contactNumber: Joi.number().integer().min(1000000000).max(9999999999),
  role: Joi.string().valid("admin", "basic").default("basic"),
});

// Validate a user object using the schema
export const validateUser = (user) => {
  return userValidationSchema.validate(user);
};
