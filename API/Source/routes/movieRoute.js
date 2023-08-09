import express from "express";
import {
  createMovie,
  getMovies,
  updateMovies,
  deleteMovies,
  getVideoplayer,
  searchMovies,
  getrandomMovie,
  getMoviesAdmin,
} from "../controllers/movieController.js";
// import { upload } from "../utils/multer.js";
// import { upload } from "../utils/multerS3.js";
import { verifyAdmin, verifyUser } from "../middleware/verifyJwt.js";

const movieRoute = express.Router();

movieRoute.get("/admin/movie", getMoviesAdmin);
movieRoute.get("/randommovie", getrandomMovie);
movieRoute.get("/movie", verifyUser, getMovies);
movieRoute.get("/searchMovie/:title", verifyUser, searchMovies);
movieRoute.post("/movie/videoplayer", verifyUser, getVideoplayer);

movieRoute.post("/movie", verifyAdmin, createMovie);
movieRoute.put("/movie", verifyAdmin, updateMovies);
movieRoute.delete("/movie/:id", verifyAdmin, deleteMovies);

export { movieRoute };
