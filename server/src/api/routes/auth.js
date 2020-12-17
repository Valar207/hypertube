const express = require("express");

const passport = require("../config/passport-config");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (request, response, next) => {
  response.send(request.user);
});

module.exports = router;
