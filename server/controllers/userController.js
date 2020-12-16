const { validateSignupInputs } = require("../utils/inputsValidator");
const { sendSignUpMail } = require("../utils/sendMail");

const errorHandler = require("../utils/errorHandler");
const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.createUser = async (req, res, next) => {
  let { email, login } = req.body;
  //CHECK SIGNUP INPUTS
  const errors = await validateSignupInputs(req);
  if (!errors.isEmpty()) {
    res.send(errors);
  } else {
    const userEmailExist = await User.findUserByEmail(email);
    const userLoginExist = await User.findUserByLogin(login);

    //CHECK IF USER EXIST IN DB
    if (userEmailExist || userLoginExist) {
      return errorHandler(res, 403, "Login or email already exist");
    }

    const newUser = await User.insertUser(req.body);
    if (!newUser) {
      return errorHandler(res, 500, "Erreur lors de l'inscription de l'utilisateur");
    }

    const user = await User.findUserByLogin(login);
    const validationToken = user.vkey; //get validation token to insert in sendMail

    console.log("user entered in db");
    sendSignUpMail(email, login, validationToken);

    return res.status(200).json({
      status: "success",
      msg: `${login} a bien été inscrit`,
    });
  }
};

exports.activateUser = async (req, res, next) => {
  console.log(req.body);
  console.log("coucououuuu");
};
