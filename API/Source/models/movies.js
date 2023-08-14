import mongoose from "mongoose";
import Joi from "joi";

const moviesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  video_360p: {
    type: String,
    required: true,
  },
  video_480p: {
    type: String,
    required: true,
  },
  video_720p: {
    type: String,
    required: true,
  },
  video_1080p: {
    type: String,
    required: true,
  },

  releaseDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  cast: {
    type: [String],
  },
  typeOfMovie: {
    type: String,
    default: "Trending Now",
  },
});
export const Movie = mongoose.model("Movie", moviesSchema);

const movieJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  video_360p: Joi.string().required(),
  video_480p: Joi.string().required(),
  video_720p: Joi.string().required(),
  video_1080p: Joi.string().required(),
  releaseDate: Joi.date(),
  genre: Joi.string().required(),
  cast: Joi.array().items(Joi.string()),
  typeOfMovie: Joi.string(),
});

// Validate movie data using Joi schema
export const validateMovie = (movieData) => {
  return movieJoiSchema.validate(movieData);
};
