import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (!token) return res.status(401).json({ message: "Token not provided" });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = decoded; // Store decoded token payload in request object
    next();
  });
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
