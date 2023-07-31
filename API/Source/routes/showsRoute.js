import express from "express";
import {
  createShow,
  getShow,
  updateShow,
  deleteShow,
} from "../controllers/showController.js";
// import { upload } from "../utils/multerS3.js";

const showRoute = express.Router();

// showRoute.post(
//   "/shows",
//   upload.fields([
//     { name: "image" },
//     { name: "video_360p" },
//     { name: "video_480p" },
//     { name: "video_720p" },
//     { name: "video_1080p" },
//     { name: "episode_image_0" },
//     { name: "episode_image_1" },
//     { name: "episode_image_2" },
//     { name: "episode_image_3" },
//     { name: "episode_image_4" },
//     { name: "episode_video_360p_0" },
//     { name: "episode_video_360p_1" },
//     { name: "episode_video_480p_0" },
//     { name: "episode_video_480p_1" },
//     { name: "episode_video_720p_0" },
//     { name: "episode_video_720p_1" },
//     { name: "episode_video_1080p_0" },
//     { name: "episode_video_1080p_1" },
//   ]),
//   createShow
// );
showRoute.post("/shows", createShow);
showRoute.get("/shows", getShow);
showRoute.put("/shows", updateShow);
showRoute.delete("/shows", deleteShow);

export { showRoute };
