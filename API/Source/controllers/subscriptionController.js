import { Subscription } from "../models/subscriptions.js";

const createSubscription = async (req, res) => {
  try {
    // console.log("Asd");
    const { startDate, endDate, userId, planId } = req.body;
    const subscriptions = new Subscription({
      startDate: startDate,
      endDate: endDate,
      user: userId,
      plan: planId,
    });
    const saveSubscription = await subscriptions.save();
    // console.log(saveSubscription);
    res.status(201).json(saveSubscription);
  } catch (err) {
    // console.log("err");
    // console.log(err.message);
    res.status(500).send(err);
  }
};

const getsubscription = async (req, res) => {
  try {
    const pageno = req.headers.pageno;
    const skipData = 5;
    const subscription = await Subscription.find()
      .populate("user")
      .populate("plan")
      .skip((pageno - 1) * skipData)
      .limit(5);
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getsubscriptiondata = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.params.id })
      .populate("user")
      .populate("plan");
    res.status(200).send(subscription);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updatesubscription = async (req, res) => {
  try {
    // console.log(req.body);
    const { startDate, endDate, userId, planId } = req.body;
    const updateData = await Subscription.findByIdAndUpdate(
      req.body.id,
      {
        startDate: startDate,
        endDate: endDate,
        user: userId,
        plan: planId,
      },
      { new: true }
    );
    // console.log(updateData);
    res.status(201).json(updateData);
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
  getsubscriptiondata,
  updatesubscription,
  deletesubscription,
};
