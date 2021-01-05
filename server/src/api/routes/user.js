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
    res.json({ status: "success", user: { ...user, email: null } });
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/", async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    const body = req.body;
    await User.updateUser(user_id, body);
    return res.status(200).json({ status: 'success', message: 'profile modifié avec succes'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error })
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

router.patch('/language/:language', async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    user.language = req.params.language;
    await User.updateUser(user_id, user);
    return res.status(200).json({ status: 'success', message: 'langue changé avec succes'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error })
  }
});

//SIGNUP USER IN DB
router.post("/signup", createUser);
//ACTIVATE USER ACCOUNT
router.post('/activateUser', activateUser);

module.exports = router;
