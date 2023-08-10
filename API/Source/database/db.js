import mongoose from "mongoose";

export const connnetToDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/NetflixDB")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
