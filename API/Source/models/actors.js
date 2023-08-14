import mongoose from "mongoose";
import Joi from "joi";

const actorSchema = new mongoose.Schema({
  label: String,
  value: String,
});

export const Actor = mongoose.model("Actor", actorSchema);
