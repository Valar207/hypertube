const token = require("./utils/authHandler");

const userData = {
  user: {
    id: "123",
    login: "Valar",
  },
};

console.log(token.generateToken(userData));
