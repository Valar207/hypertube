const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imgProfile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "en",
  },
});

module.exports = mongoose.model("User", UserSchema, "User");
