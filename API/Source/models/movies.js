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
  },
  video_360p: {
    type: String,
  },
  video_480p: {
    type: String,
  },
  video_720p: {
    type: String,
  },
  video_1080p: {
    type: String,
  },
  // videoSize: {
  //   type: Number,
  // },
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
