const { validateSignupInputs, validateNewPasswordInputs } = require("../utils/inputsValidator");
const { sendSignUpMail, sendResetPasswordMail } = require("../utils/sendMail");
const authHandler = require("../utils/authHandler");
const errorHandler = require("../utils/errorHandler");
const passport = require("../config/passport-config");
const User = require("../models/User");

// Recupere tout les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err });
  }
};

// Mettre a jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    const body = req.body;
    await User.updateUser(user_id, body);
    return res.status(200).json({ status: "success", message: "profile modifié avec succes" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error });
  }
};

// Supprime un utilisateur
exports.deleteUser = (request, response, next) => {
  console.log(request.user);
  return response.status(200).json("OK");
};

// Connecte un utilisateur inscrit
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({ status: "error", message: "Wrong username or password" });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ status: "success", message: "authentication succeeded" });
    });
  })(req, res, next);
};

// Mets a jour la langue par defaut de l'utilisateur
exports.updateLanguage = async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    user.language = req.params.language;
    await User.updateUser(user_id, user);
    return res.status(200).json({ status: "success", message: "langue changé avec succes" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//Recupere un utilisateur via son login

exports.getUserByLogin = async (req, res, next) => {
  try {
    const { userLogin } = req.params;
    const user = await User.findUserByUsername(userLogin);
    if (!user) return res.status(200).json({ status: "error", message: "Utilisateur introuvable" });
    const result = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      imgProfile: user.imgProfile,
    };
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

// Recupere un utilisateur via son ID
exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findUserById(userId);
    if (!user) return res.status(200).json({ status: "error", message: "Utilisateur introuvable" });
    const result = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      imgProfile: user.imgProfile,
    };
    return res.status(200).json({ status: "success", user: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: JSON.stringify(error) });
  }
};

// Creer un utilisateur
exports.createUser = async (req, res, next) => {
  let { email, username } = req.body;
  //CHECK SIGNUP INPUTS
  const errors = await validateSignupInputs(req);
  if (!errors.isEmpty()) {
    res.send(errors);
  } else {
    const userEmailExist = await User.findUserByEmail(email);
    const userUsernameExist = await User.findUserByUsername(username);

    //CHECK IF USER EXIST IN DB
    if (userEmailExist || userUsernameExist) {
      return res.send({ status: "error", message: "Username or email already exist" });
    }

    const newUser = await User.insertUser(req.body);
    if (!newUser) {
      return res.send({ status: "error", message: "Erreur lors de l'inscription de l'utilisateur" });
    }

    const user = await User.findUserByUsername(username);
    const validationToken = user.vkey; //get validation token to insert in sendMail

    console.log("user entered in db");
    sendSignUpMail(email, username, validationToken);

    return res.send({
      status: "success",
      message: `${username} a bien été inscrit`,
    });
  }
};

exports.activateUser = async (req, res, next) => {
  const username = req.body.search.split("&")[0].split("=")[1];
  const urlToken = req.body.search.split("&")[1].split("=")[1];
  const user = await User.findUserByUsername(username);
  if (user) {
    const bddToken = user.vkey;
    if (urlToken === bddToken) {
      console.log("token match");
      User.updateUser(user.id, { vkey: "" });
      res.send({ status: "success", message: "Account activated !" });
    } else {
      console.log("token doesnt match");
      return res.send({ status: "error", message: "incorrect token" });
    }
  } else {
    return res.send({ status: "error", message: "incorrect username" });
  }
};

exports.resetPasswordEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findUserByEmail(email);

  if (email) {
    if (user) {
      let fkey;
      fkey = await authHandler.generateToken(user); //génère un token pour reset le password
      User.updateUser(user.id, { fkey: fkey });
      sendResetPasswordMail(email, fkey);
      return res.send({ status: "success", message: "A reset email has been sent to you" });
    } else {
      return res.send({ status: "error", message: "This email is not registered" });
    }
  }
};

//CHECK IF THE USER IS ALLOWED ON RESET PASSWORD PAGE
exports.resetPasswordPage = async (req, res, next) => {
  const email = req.body.search.split("&")[0].split("=")[1];
  const urlToken = req.body.search.split("&")[1].split("=")[1];
  const user = await User.findUserByEmail(email);

  if (user) {
    const bddForgotToken = user.fkey;
    if (urlToken === bddForgotToken) {
      //TOKEN CORRECT
      return res.send({ status: "success" });
    } else {
      //TOKEN INCORRECT
      return res.send({ status: "error" });
    }
  } else {
    return res.send({ status: "error" });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { newPassword, confirmNewPassword } = req.body.password;
  const email = req.body.url.search.split("&")[0].split("=")[1];
  const user = await User.findUserByEmail(email);

  if (!newPassword || !confirmNewPassword) {
    return res.send({ status: "error", message: "please fill in all inputs" });
  }

  if (newPassword.length < 8) {
    return res.send({
      status: "error",
      message: "Password must be at least 8 characters",
      param: "newPassword",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.send({ status: "error", message: "Passwords don't match", param: "confirmNewPassword" });
  }

  let hashedPassword = null;
  hashedPassword = await authHandler.hashPassword(newPassword);
  User.updateUser(user._id, { password: hashedPassword });
  return res.send({ status: "success", message: "Password has been modified" });
};
