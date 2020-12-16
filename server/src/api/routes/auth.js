const express = require("express");

const passport = require('../config/passport-config');

const router = express.Router();

router.use(passport.initialize())

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.get("/google/redirect", passport.authenticate('google'));


module.exports = router;