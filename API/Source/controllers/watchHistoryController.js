import { Watchhistory } from "../models/watchhistory.js";

const createWatchHistory = async (req, res) => {
  try {
    // console.log("asd");
    // console.log(req.body);
    const { userId, movieId } = req.body;
    const findData = await Watchhistory.findOne({
      user: userId,
      movie: movieId,
    });
    // console.log(findData);
    if (findData) {
      return res.send("Alread Exists");
    }

    const watchhistory = new Watchhistory({
      user: userId,
      movie: movieId,
    });
    const saveWatchHistory = await watchhistory.save();
    res.status(200).json(saveWatchHistory);
  } catch (error) {
    // console.log(error);
    res.status(404).send(error);
  }
};

const getWatchHistory = async (req, res) => {
  try {
    const data = await Watchhistory.find({ user: req.body.userId })
      .populate("movie")
      .sort({ timeStamp: -1 });
    res.status(200).json(data);
  } catch (error) {
    // console.log(error);
    res.status(404).send(error);
  }
};

export { createWatchHistory, getWatchHistory };
