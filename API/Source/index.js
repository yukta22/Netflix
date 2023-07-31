import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import fileUpload from "express-fileupload";
import { route } from "./routes/indexRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/NetflixDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());
app.use("/", route);
app.listen(9000, () => {
  console.log(`Server running on port 9000`);
});
