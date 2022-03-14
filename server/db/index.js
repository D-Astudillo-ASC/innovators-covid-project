const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect('mongodb://127.0.0.1:27017/MedicalData', {
  //.connect(process.env.ATLAS_URI || 'mongodb://127.0.0.1:27017/MedicalData', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

db.once('open', function() {
  console.log('MongoDb database connection established successfully');
});

module.exports = db;
