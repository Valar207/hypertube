const express = require("express");
const { check, validationResult } = require("express-validator");
const { validateSignupInputs } = require("../utils/inputsValidator");
const { sendSignUpMail } = require("../utils/sendMail");
const bcrypt = require("bcrypt");

//import model
const User = require("../models/User");

const router = express.Router();

//GET ALL THE USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

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
router.post("/signup", async (req, res, next) => {
  let { lastname, firstname, email, imgProfile, username, password } = req.body;
  //CHECK SIGNUP INPUTS
  const errors = await validateSignupInputs(req);
  // console.log(req.body);
  if (!errors.isEmpty()) {
    res.send(errors);
  } else {
    //CHECK IF USER EXIST IN DB
    User.findOne({ email }, (err, userExist) => {
      if (err || userExist) return error(res, "email", "This email is already used.");
      else {
        User.findOne({ username }, (err, userExist) => {
          if (err || userExist) return error(res, "username", "This username is already used.");
          else {
            //CRYPT PASSWORD AND PUT USER IN DB
            bcrypt.hash(password, 10, async (err, hash) => {
              const user = new User({
                lastname,
                firstname,
                username,
                email,
                imgProfile,
                password: hash,
              });
              try {
                const savedUser = await user.save();
                res.send({ success: true, savedUser });
                console.log("user entered in db");
                sendSignUpMail(email, username);
              } catch (err) {
                res.send({ message: err });
                console.log("error registering user in db");
              }
            });
          }
        });
      }
    });
  }
});

module.exports = router;
