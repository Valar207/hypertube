const { check, validationResult } = require("express-validator");

const validateSignupInputs = async (req) => {
  await check("imgProfile", "you should add a profile picture").isLength({ min: 1 }).run(req);
  await check("firstname", "firstname is not valid").isLength({ min: 1 }).run(req);
  await check("lastname", "lastname is not valid").isLength({ min: 1 }).run(req);
  await check("username", "username is not valid").isLength({ min: 4 }).run(req);
  await check("email", "email is not valid").isEmail().run(req);
  await check("password", "password is not valid").isLength({ min: 8 }).run(req);
  await check("confirmPassword", "Passwords don't match")
    .custom((value, { req, loc, path }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    })
    .run(req);

  const errors = validationResult(req);

  return errors;
};

module.exports = { validateSignupInputs };
