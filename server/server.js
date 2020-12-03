const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();
const server = require("http").createServer(app);

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

app.post("/", (req, res) => {
  console.log(req.body);
});
