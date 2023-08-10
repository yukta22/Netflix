import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validateTokenMiddleware = (req, res, next) => {
  const token = req.headers.token; // Assuming token is sent in the format 'Bearer <token>'
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        res.status(409).send(err);
      } else {
        next();
      }
    });
  } catch (error) {
    console.log("error");
    res.status(401).json({ message: "Unauthorized" });
  }
};

export const verifyUser = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.status(409).send(err);
    } else {
      // console.log(data);
      if (data.role == "admin" || data.role == "basic") {
        next();
      } else {
        res.status(401).send("you are not authorized ");
      }
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.status(409).send(err);
    } else {
      if (data.role == "admin") {
        // console.log(data, "data");
        req.user = data;
        next();
      } else {
        res
          .status(401)
          .send(
            "only admin can create, edit and delete Movies/Shows, you are unauthoried"
          );
      }
    }
  });
};
