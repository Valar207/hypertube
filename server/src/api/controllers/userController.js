const errorHelper = require('../helpers/errorHelper');

const User = require('../models/User');

// Recupere tout les utilisateurs
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.getUsers();
    if (allUsers) {
      return res.status(200).json({
        status: 'success',
        users: allUsers
      });
    }
  } catch (error) {
    console.error(error);
    return errorHelper(res, 404, error);
  }
};

// Crée un utilisateur
exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findUserByEmail(email);
    if (userExist)
		return errorHelper(res, 403, 'Cet utilisateur existe deja');

	const newUser = await User.insertUser(req.body);
	if (!newUser)
		return errorHelper(res, 500, "Erreur lors de l'inscription de l'utilisateur");
    return res.status(200).json({
		status: 'success',
		msg: `${req.body.login} a bien été inscrit`
	});
  } catch (error) {
    console.log(error);
    return errorHelper(res, 500, error);
  }
};
