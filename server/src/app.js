const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const db = require('./api/services/db'); // Middleware qui connecte a la DB
const api = require('./api'); // Toute l'api


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(db);


app.get('/', (req, res) => res.json({
  message: 'Hey'
}));

app.use('/api/v1', api);

module.exports = app;