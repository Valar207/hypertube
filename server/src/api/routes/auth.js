const { response } = require("express");
const express = require("express");

const passport = require("../config/passport-config");

const { checkLoggedIn } = require('../utils/authHandler');

const router = express.Router();

//CHeck si l'utilisateur est connecté
router.get('/is_logged', checkLoggedIn, (req, res) => {
  return res.status(200).json({ status: "success", message: true });
});


// GOOGLE
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 42
router.get("/42", passport.authenticate("42"));

// LOCAL


//CALLBACK GOOGLE
router.get("/google/redirect", passport.authenticate("google"), (request, response, next) => {
  response.status(200).json(request.user);
});

//CALLBACK 42
router.get("/42/redirect", passport.authenticate("42"), (request, response, next) => {
  response.status(200).json(request.user);
});

//LOCAL
router.get("/local/redirect", (request, response, next) => {
  response.status(200).json(request.user);
});

//LOGOUT
router.get('/logout', checkLoggedIn, (request, response) => {
  if (request.isAuthenticated()) {
    request.logout();
    return response.status(200).json({ status: "success", message: "Logged out successfuly" });
  }
  return response.status(200).json({ status: "error", message: "User was not logged in" });
});

module.exports = router;
