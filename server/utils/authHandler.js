const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Génere un jwt
exports.generateToken = (userData) => {
  const payload = {
    user: {
      id: userData.id,
      login: userData.login,
    },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
};

// Hash un mdp
// Return : le mdp hashé
exports.hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Compare un mdp crypté et un mdp en clair
// Return : true en cas d'égalité, false sinon
exports.comparePassword = async (userPassword, otherPassword) => {
  const result = await bcrypt.compare(userPassword, otherPassword);
  return result;
};
