const User = require("../models/User");

exports.uploadImg = (req, res) => {
  const fs = require("fs");
  const image = req.files.img;
  const username = req.body.username;
  var extpath = require("path");
  var type = extpath.extname(`${req.files.img.name}`);
  console.log(username);
  const path = `/photos/${req.body.username}`;
  const jpg = `../client/public${path}` + ".jpg";
  const jpeg = `./client/public${path}` + ".jpeg";
  const png = `../client/public${path}` + ".png";

  if (fs.existsSync(jpg)) fs.unlinkSync(jpg);
  else if (fs.existsSync(jpeg)) fs.unlinkSync(jpeg);
  else if (fs.existsSync(png)) fs.unlinkSync(png);

  image.mv(`../client/public/photos/${req.body.username}${type}`, (err) => {
    if (err) {
      console.log(err);
    } else {
      User.updateUserByUsername(username, { imgProfile: `/photos/${username}${type}` });
      res.send({
        status: "success",
      });
    }
  });
};
