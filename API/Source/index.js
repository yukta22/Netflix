import express from "express";
import cors from "cors";
import { route } from "./routes/indexRoute.js";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { connnetToDB } from "./database/db.js";

const app = express();

connnetToDB();
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
