import mongoose from "mongoose";

const watchhistorySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  show: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Show",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
});
const Watchhistory = mongoose.model("Watchhistory", watchhistorySchema);
