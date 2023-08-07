import mongoose from "mongoose";

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
