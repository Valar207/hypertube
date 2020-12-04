const User = require('../models/User');
const authHelper = require('../helpers/authHelper');

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    const userExist = await User.findUserByEmail(login);
    if (userExist) {
      const isMatch = await authHelper.comparePassword(password, userExist.password);
      if (isMatch) {
        const token = await authHelper.generateToken(userExist);
        return res.status(200).json({
          status: 'success',
          token,
          authUser: userExist
        });
      }
      return res.status(403).json({
        status: 'error',
        message: "Passwords doesn't matchs"
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'User not found'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error'
    });
  }
};
