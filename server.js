require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const log4js = require('log4js');
log4js.configure({
  appenders: { test_backend: { type: 'file', filename: 'server.log' } },
  categories: { default: { appenders: ['test_backend'], level: 'debug' } }
});

const logger = log4js.getLogger();

const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({extended: false}));


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));