const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();
const server = require("http").createServer(app);

const port = process.env.port || 8080;
// const fileUpload = require("express-fileupload");
app.use(cors());
app.use(bodyparser.json());
// app.use(fileUpload());

//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log("connected to DB !!");
  // DISPLAY ALL COLLECTIONS
  // mongoose.connection.db.listCollections().toArray(function (err, names) {
  //   console.log(names);
  // });
});
mongoose.set("useCreateIndex", true); //fix un warning

//test db

//server listening
server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on ${port}`);
});

//routes
const userRoutes = require("./routes/user");

app.use("/user", userRoutes);
