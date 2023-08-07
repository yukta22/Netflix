import mongoose from "mongoose";

const watchhistorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  // show: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Show",
  // },
});
export const Watchhistory = mongoose.model("Watchhistory", watchhistorySchema);
