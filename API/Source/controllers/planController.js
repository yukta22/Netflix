import { Plan } from "../models/plans.js";

const createPlan = async (req, res) => {
  try {
    const plan = new Plan({
      name: req.body.name,
      charges: req.body.charges,
      quality: req.body.quality,
      resolution: req.body.resolution,
    });

    const savePlan = await plan.save();
    res.status(201).json(savePlan);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getPlan = async (req, res) => {
  try {
    const plan = await Plan.find();
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePlan = async (req, res) => {
  try {
    const id = req.params.id;
    await Plan.findByIdAndUpdate(id, req.body);
    res.status(200).json("Data updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
const deletePlan = async (req, res) => {
  try {
    const id = req.params.id;
    await Plan.findByIdAndDelete(id);
    res.status(200).json("Data deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export { createPlan, getPlan, updatePlan, deletePlan };
