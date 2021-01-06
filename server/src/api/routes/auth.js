const express = require("express");

const passport = require("../config/passport-config");

const { getSession, getGoogleRedirect, get42Redirect, getLogout } = require('../controllers/authController');

const { checkLoggedIn } = require('../utils/authHandler');

const router = express.Router();

//CHeck si l'utilisateur est connecté
router.get('/is_logged', checkLoggedIn, getSession);


// GOOGLE
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// 42
router.get("/42", passport.authenticate("42"));

//CALLBACK GOOGLE
router.get("/google/redirect", passport.authenticate("google"), getGoogleRedirect);

//CALLBACK 42
router.get("/42/redirect", passport.authenticate("42"), get42Redirect);

//LOGOUT
router.get('/logout', checkLoggedIn, getLogout);

module.exports = router;
