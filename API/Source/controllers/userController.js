import { User, validateUser } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { uploadUserProfileS3 } from "../utils/userProfileS3.js";
import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { userName, userEmail, userPassword, contactNumber, role } = req.body;

    const findUser = await User.findOne({ userEmail: userEmail });
    if (findUser) {
      return res.send("User already exists");
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
          console.log({
            userName: findData.userName,
            userEmail: findData.userEmail,
            role: findData.role,
          });
          const token = jwt.sign(
            {
              userName: findData.userName,
              userEmail: findData.userEmail,
              role: findData.role,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "12h",
            }
          );
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

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUser = async (req, res) => {
  try {
    const pageno = req.headers.pageno;
    const skipData = 5;
    const users = await User.find()
      .skip((pageno - 1) * skipData)
      .limit(5);
    res.status(201).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateUser = async (req, res) => {
  try {
    // console.log(req.files.userProfile);
    // const file = req.files.userProfile;
    const { userName, userEmail } = req.body;
    console.log(req.params.id, req.body);
    const updateData = await User.findByIdAndUpdate(
      req.params.id,
      { userName, userEmail },
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
    console.log(req.params.id);
    const data = await User.findByIdAndDelete(req.params.id);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export { createUser, getUser, getUsers, getAllUser, updateUser, deleteUser };
