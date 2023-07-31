import { User } from "../models/users.js";
import { Otp } from "../models/otp.js";
import { sendotp } from "../utils/twilioOtp.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadS3 } from "../utils/uploadS3.js";
import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword, contactNumber, role } = req.body;

    const findUser = await User.findOne({ userEmail: userEmail });
    if (findUser) {
      return res.json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(userPassword, 10);

    const user = new User({
      userName: userName,
      userEmail: userEmail,
      userPassword: hashPassword,
      contactNumber: contactNumber,
      role: role,
    });

    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getUser = async (req, res) => {
  try {
    const data = req.user;
    const { userPassword, userEmail, userName } = req.body;
    const findData = await User.findOne({ userEmail: userEmail });
    if (findData) {
      bcrypt.compare(userPassword, findData.userPassword, (err, result) => {
        if (result) {
          const token = jwt.sign({ findData }, process.env.SECRET_KEY, {
            expiresIn: "12h",
          });
          res.status(201).send({ findData, token, data });
        } else {
          res.send("Login failure");
        }
      });
    } else {
      res.send("user not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const findData = await User.findOne({ userEmail: userEmail });
    if (!findData) {
      res.status(409).send("User Not Found");
    }
    // console.log(req.files.userProfile);
    const file = req.files.userProfile;
    const url = await uploadS3(file.name, file.data);
    const updateData = await User.findOneAndUpdate(
      { userEmail: userEmail },
      {
        userName: req.body.userName,
        userProfile: url,
      },
      {
        new: true,
      }
    );

    res.status(201).send(updateData);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).send("User deleted successfully");
  } catch (err) {
    res.status(500).send(err);
  }
};

export { createUser, getUser, getAllUser, updateUser, deleteUser };
