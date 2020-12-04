const mongoose = require('mongoose');
require('dotenv').config();

const Movie = require('./Movie');
const authHelper = require('../helpers/authHelper');

const { DEFAULT_USER_IMAGE } = process.env;

const { Schema } = mongoose;
const UserSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  history: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  }],
  vkey: {
    type: String
  },
  fkey: {
    type: String
  }
});

// Récupérer tout les utilisateurs
UserSchema.methods.getUsers = async () => {
  try {
    const users = await this.model('User').find().exec();
    return users;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Insérer un nouvel utilisateur
UserSchema.statics.insertUser = async (userData) => {
  try {
    const hashedPassword = await authHelper.hashPassword(userData.password);

    const user = {
      login: userData.login,
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      lastname: userData.lastname,
      image: userData.image ? userData.image : DEFAULT_USER_IMAGE,
      language: userData.language,
      history: []
    };

    const result = await this.model('User', userData).save();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Update un utilisateur
UserSchema.methods.updateUser = async (userId, userData) => {
  try {
    const result = await this.model('User').findByIdAndUpdate(userId, userData).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Récupérer un utilisateur via son id
UserSchema.methods.findUserById = async (userId) => {
  try {
    const result = await this.model('User').findById(userId).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Récupérer un utilisateur via son login
UserSchema.methods.findUserByLogin = async (userLogin) => {
  try {
    const result = await this.model('User').findOne({ login: userLogin }).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Récupérer un utilisateur via son email
UserSchema.statics.findUserByEmail = async (userEmail) => {
  try {
    const result = await this.model('User').findOne({ email: userEmail }).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Supprimer un utilisateur
UserSchema.methods.deleteUser = async (userId) => {
  try {
    const result = await this.model('User').findByIdAndRemove(userId).exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

// Supprimer tout les utilisateurs
UserSchema.statics.removeUsers = async () => {
  try {
    const result = this.model('User').deleteMany().exec();
    return result;
  } catch (error) {
    console.error(`User model: ${error}`);
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
