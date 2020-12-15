const express = require("express");

//import model
const User = require("../models/User");

//import controllers
const { getAllUsers, createUser, activateUser } = require("../controllers/userController");

const router = express.Router();

//GET ALL THE USERS
router.get("/", getAllUsers);

//GET SPECIFIC USER IN DB
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE A USER
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/signin", (req, res) => {
  console.log(req.body);
});

const error = (res, param, msg) => res.send({ errors: [{ param, msg }] });

//SIGNUP USER IN DB
router.post("/signup", createUser);
//ACTIVE USER ACCOUNT
router.post("/activateUser", activateUser);

module.exports = router;
