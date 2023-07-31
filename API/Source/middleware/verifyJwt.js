import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.token;
  // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) {
      res.status(409).send(err);
    } else {
      // console.log(data);
      if (data.findData.role == "admin") {
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
