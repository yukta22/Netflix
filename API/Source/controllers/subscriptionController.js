import { Subscription } from "../models/subscriptions.js";

const createSubscription = async (req, res) => {
  try {
    const { startDate, endDate, userId, planId, abc } = req.body;
    const subscriptions = new Subscription({
      startDate: startDate,
      endDate: endDate,
      user: userId,
      plan: planId,
      abc: abc,
    });

    const saveSubscription = await subscriptions.save();
    res.status(201).json(saveSubscription);
  } catch (err) {
    console.log("err");
    console.log(err.message);
    res.status(500).send(err);
  }
};

const getsubscription = async (req, res) => {
  try {
    const subscription = await Subscription.find()
      .populate("user")
      .populate("plan");
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatesubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json("Data updated");
  } catch (err) {
    res.status(500).send(err);
  }
};
const deletesubscription = async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(201).json("Data deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};

export {
  createSubscription,
  getsubscription,
  updatesubscription,
  deletesubscription,
};
