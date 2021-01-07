const express = require("express");
const passport = require("../config/passport-config");

//import model
const User = require("../models/User");

//import controllers
const { getAllUsers, getUserByLogin, getUserById, updateUser, deleteUser, postLogin, updateLanguage, createUser, activateUser } = require("../controllers/userController");

const { checkLoggedIn } = require('../utils/authHandler');

const router = express.Router();

//GET ALL THE USERS
router.get("/", getAllUsers);

router.get("/:userLogin", getUserByLogin);

//GET SPECIFIC USER IN DB BY ID
router.get("/id/:userId", getUserById);


// UPDATE USER
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
