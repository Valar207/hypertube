const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");
require("dotenv").config();

const strategyOptions = {
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_PASSWORD,
  callbackURL: "http://localhost:5000/api/v1/auth/google/redirect",
};

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  try {
    const google_user = profile._json;
    const { name, given_name, family_name, email, picture, locale } = google_user;
    const user = await User.findUserByEmail(email);
    if (user) return done(null, user);
    const newUser = new User({
      login: name,
      email,
      password: null,
      firstname: given_name,
      lastname: family_name,
      imgProfile: picture,
      language: locale,
    });
    await User.insertUser(newUser);
    done(null, newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findUserById(id).then((user) => {
    console.log(user);
    done(null, user);
  });
});

passport.use(new GoogleStrategy(strategyOptions, verifyCallback));

module.exports = passport;
