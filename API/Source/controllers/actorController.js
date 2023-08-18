import { Actor } from "../models/actors.js";

const createActor = async (req, res) => {
  try {
    const actorsData = req.body;

    const insertedActors = await Actor.insertMany(actorsData);
    res.status(201).json(insertedActors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An error occurred while inserting actor data.");
  }
};

const getActor = async (req, res) => {
  try {
    const actorsData = await Actor.find();

    res.status(201).json(actorsData);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while inserting actor data.");
  }
};

export { createActor, getActor };
