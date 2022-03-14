/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const path = require('path');

const db = require('./db');
// const itemRouter = require('./routes/item-router');
const patientRouter = require('./routes/patient-router');
const examRouter = require('./routes/exam-router');

const app = express();
//const apiPort = process.env.PORT || 3000;
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


if (process.env.NODE_ENV === 'production'){
  app.use(express.static('./client/build'));
}

// Production Build
/*
app.use(express.static(path.resolve(__dirname, './client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
*/
//app.use('/api', itemRouter);
app.use('/api', patientRouter);
app.use('/api', examRouter);

app.listen(apiPort, () => {
  console.log(`[Hack.Diversity React Template] - Server running on port ${apiPort}`);
});
