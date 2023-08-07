import mongoose from "mongoose";

const showsSchema = new mongoose.Schema({
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
    // required: true,
  },
  video_480p: {
    type: String,
    // required: true,
  },
  video_720p: {
    type: String,
    // required: true,
  },
  video_1080p: {
    type: String,
    // required: true,
  },
  releaseDate: {
    type: Date,
  },
  genre: {
    type: String,
    // required: true,
  },
  cast: {
    type: [String],
  },
  typeOfMovie: {
    type: String,
    required: true,
  },
  episode: [
    {
      title: {
        type: String,
        // required: true,
      },
      description: {
        type: String,
        // required: true,
      },
      releaseDate: {
        type: Date,
      },
      image: {
        type: String,
        // required: true,
      },
      video_360p: {
        type: String,
        // required: true,
      },
      video_480p: {
        type: String,
        // required: true,
      },
      video_720p: {
        type: String,
        // required: true,
      },
      video_1080p: {
        type: String,
        // required: true,
      },
    },
  ],
  typeOfMovie: {
    type: String,
  },
});
export const Show = mongoose.model("Show", showsSchema);
