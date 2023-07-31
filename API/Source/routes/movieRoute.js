import express from "express";
import {
  createMovie,
  getMovies,
  updateMovies,
  deleteMovies,
  getVideoplayer,
  searchMovies,
} from "../controllers/movieController.js";
// import { upload } from "../utils/multer.js";
// import { upload } from "../utils/multerS3.js";
import { verifyAdmin } from "../middleware/verifyJwt.js";

const movieRoute = express.Router();

movieRoute.get("/movie", getMovies);
movieRoute.get("/searchMovie/:title", searchMovies);
movieRoute.post("/movie/videoplayer", getVideoplayer);

// movieRoute.post(
//   "/movie",
//   upload.fields([
//     { name: "image" },
//     { name: "video_360p" },
//     { name: "video_480p" },
//     { name: "video_720p" },
//     { name: "video_1080p" },
//   ]),
//   verifyAdmin,
//   createMovie
// );
movieRoute.post("/movie", verifyAdmin, createMovie);
movieRoute.put("/movie/:id", updateMovies);
movieRoute.delete("/movie/:id", deleteMovies);

export { movieRoute };
