const { validateSignupInputs } = require("../utils/inputsValidator");
const { sendSignUpMail } = require("../utils/sendMail");

const errorHandler = require("../utils/errorHandler");
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

// Recuperer des infos sur un utilisateur
exports.getUser = async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    const body = req.body;
    await User.updateUser(user_id, body);
    return res.status(200).json({ status: 'success', message: 'profile modifié avec succes'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error })
  }
}

// Mettre a jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    const body = req.body;
    await User.updateUser(user_id, body);
    return res.status(200).json({ status: 'success', message: 'profile modifié avec succes'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: error })
  }
};

// Supprime un utilisateur
exports.deleteUser = (request, response, next) => {
  console.log(request.user);
  return response.status(200).json("OK");
};

// Connecte un utilisateur inscrit
exports.postLogin = (request, response, next) => {
  console.log(request.user);
  return response.status(200).json("OK");
};

// Mets a jour la langue par defaut de l'utilisateur
exports.updateLanguage = async (req, res) => {
  try {
    const user = req.user;
    const user_id = user._id;
    user.language = req.params.language;
    await User.updateUser(user_id, user);
    return res.status(200).json({ status: 'success', message: 'langue changé avec succes'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error })
  }
};

// Recupere un utilisateur via son ID
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findUserById(id);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
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
  const user = await User.findUserByUsername(username);
  const urlToken = req.body.search.split("&")[1].split("=")[1];
  if (user) {
    const bddToken = user.vkey;
    if (urlToken === bddToken) {
      console.log("token match");
      User.updateUser(user.id, { vkey: "" });
      res.send({ status: "success", msg: "Compte activé !" });
    } else {
      console.log("token doesnt match");
      return res.send({ status: "error", message: "incorrect token" });
    }
  } else {
    return res.send({ status: "error", message: "incorrect username" });
  }
};
