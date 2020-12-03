const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const server = require("http").createServer(app);
const { check, validationResult } = require("express-validator");

const port = process.env.port || 8080;
// const fileUpload = require("express-fileupload");
app.use(cors());
app.use(bodyparser.json());
// app.use(fileUpload());

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on ${port}`);
});

app.post("/login", (req, res) => {
  console.log(req.body);
});

app.post("/signin", (req, res) => {
  console.log(req.body);
});

app.post(
  "/signup",
  [
    check("firstname", "firstname is not valid").isLength({ min: 1 }),
    check("lastname", "lastname is not valid").isLength({ min: 1 }),
    check("username", "username is not valid").isLength({ min: 4 }),
    check("email", "email is not valid").isEmail(),
    check("password", "password is not valid").isLength({ min: 8 }),
    check("confirmPassword", "Passwords don't match").custom((value, { req, loc, path }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      } else {
        return value;
      }
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.send(errors);
    } else {
      res.send("SUCCESS");
    }

    // console.log(req.body);
  }
);
