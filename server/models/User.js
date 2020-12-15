const mongoose = require("mongoose");
const authHandler = require("../utils/authHandler");

const UserSchema = mongoose.Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  login: {
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
    required: true,
  },
  vkey: {
    type: String,
  },
  fkey: {
    type: String,
  },
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Movie",
    },
  ],
});

// Récupérer tout les utilisateurs
UserSchema.statics.getUsers = async function () {
  try {
    const users = await this.model("User").find().exec();
    return users;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Insérer un nouvel utilisateur
UserSchema.statics.insertUser = async function (userData) {
  try {
    const hashedPassword = await authHandler.hashPassword(userData.password);
    const vkey = await authHandler.generateToken(userData);
    const user = {
      login: userData.login,
      email: userData.email,
      password: hashedPassword,
      firstname: userData.firstname,
      lastname: userData.lastname,
      imgProfile: userData.imgProfile,
      language: userData.language,
      vkey: vkey,
      history: [],
    };

    const newUser = new this(user);
    const result = await newUser.save();
    return result;
  } catch (error) {
    console.error(`User model insertUser: ${error}`);
  }
};

// Update un utilisateur
UserSchema.statics.updateUser = async function (userId, userData) {
  try {
    const result = await this.model("User").findByIdAndUpdate(userId, userData).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Récupérer un utilisateur via son id
UserSchema.statics.findUserById = async function (userId) {
  try {
    const result = await this.model("User").findById(userId).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Récupérer un utilisateur via son login
UserSchema.statics.findUserByLogin = async function (userLogin) {
  try {
    const result = await this.model("User").findOne({ login: userLogin }).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Récupérer un utilisateur via son email
UserSchema.statics.findUserByEmail = async function (userEmail) {
  try {
    const result = await this.model("User").findOne({ email: userEmail }).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Supprimer un utilisateur
UserSchema.statics.deleteUser = async function (userId) {
  try {
    const result = await this.model("User").findByIdAndRemove(userId).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Supprimer tout les utilisateurs
UserSchema.statics.removeUsers = async function () {
  try {
    const result = this.model("User").deleteMany().exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

const User = mongoose.model("User", UserSchema, "User");

module.exports = User;
