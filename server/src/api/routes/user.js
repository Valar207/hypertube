const express = require("express");
const passport = require("../config/passport-config");

//import model
const User = require("../models/User");

//import controllers
const { getAllUsers, getUser, updateUser, deleteUser, postLogin, updateLanguage, createUser, activateUser } = require("../controllers/userController");

const { checkLoggedIn } = require('../utils/authHandler');

const router = express.Router();

//GET ALL THE USERS
router.get("/", getAllUsers);

//GET SPECIFIC USER IN DB
router.get("/:userId", checkLoggedIn, getUser);

router.patch("/", checkLoggedIn, updateUser);

//DELETE A USER
router.delete("/:userId", deleteUser);

router.post("/signin", passport.authenticate("local"), postLogin);

router.patch('/language/:language', checkLoggedIn, updateLanguage);

//SIGNUP USER IN DB
router.post("/signup", createUser);
//ACTIVATE USER ACCOUNT
router.post('/activateUser', activateUser);

module.exports = router;
