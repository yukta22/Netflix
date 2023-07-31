import multer from "multer";
import { cloudinary } from "./cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// const storage = multer.diskStorage({});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: "Netflix",
      resource_type: "auto",
    };
  },
});
export const upload = multer({ storage: storage });
