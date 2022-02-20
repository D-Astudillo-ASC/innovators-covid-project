/* eslint-disable no-undef, arrow-body-style */
const Patient = require('../models/patient-model.js');

getItems = async (req, res) => {
  await Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json('Error: ' + err));
};

getItemById = async (req, res) => {
  await Patient.findById(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json('Error: ' + err));
};
getByPatientId = async (req, res) => {
  console.log(req);
  await Patient.find({ PATIENT_ID: req.params.PATIENT_ID })
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json('Error: ' + err));
};

createItem = (req, res) => {
  const patient_id = req.body.patient_id;
  const age = Number(req.body.age);
  const sex = req.body.sex;
  const bmi = Number(req.body.bmi);
  const zip_code = Number(req.body.zip_code);

  // build new patient object
  const newPatient = new Patient({
    patient_id,
    age,
    sex,
    bmi,
    zip_code,
  });

  // save new patient into database
  newPatient
    .save()
    .then(() => res.json('Patient added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

updateItem = (req, res) => {
  Patient.findByIdAndUpdate(req.params.id, req.body)
    .then(patient => res.json('Updated succesfully'))
    .catch(err => res.status(400).json('Error: ' + err));
};

deleteItem = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id)
    .then(() => res.json('Patient deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
  getItems,
  getItemById,
  getByPatientId,
  createItem,
  updateItem,
  deleteItem,
};