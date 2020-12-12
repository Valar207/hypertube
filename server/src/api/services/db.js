const mongoose = require('mongoose');
require('dotenv').config();


const URI = process.env.DB_URL;

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise,
  keepAlive: 1,
  connectTimeoutMS: 30000,
};

const connectDB = async (req, res, next) => {
  await mongoose.connect(URI,
    options,);
  console.log('db connected');
  next();
};

module.exports = connectDB;
