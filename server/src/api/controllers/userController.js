const createError = require('http-errors');
const User = require('../models/User');

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
    next(createError(404, 'User Not Found', { status: 'error' }));
  }
};

exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExist = await User.findUserByEmail(email);
    if (!userExist) {
      const newUser = await User.insertUser(req.body);
      if (newUser) {
        return res.status(200).json({
          status: 'success',
          msg: `${req.body.name} is register successfully`
        });
      }
    } else {
      next(createError(403, 'Cet utilisateur existe deja', { status: 'error' }));
    }
  } catch (error) {
    console.log(error);
  }
};
