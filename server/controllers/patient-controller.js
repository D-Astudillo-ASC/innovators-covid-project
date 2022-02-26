/* eslint-disable no-undef, arrow-body-style */
const Patient = require('../models/patient-model.js');

getPatients = async (req, res) => {
  await Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json('Error: ' + err));
};

// getPatientById = async (req, res) => {
//   await Patient.findById(req.params.id)
//     .then(patient => res.json(patient))
//     .catch(err => res.status(400).json('Error: ' + err));
// };
getByPatientId = async (req, res) => {
  console.log(req.query);
  await Patient.find({ PATIENT_ID: req.query.PATIENT_ID })
    .then(patient => {
      console.log(patient);
      res.json(patient[0]);
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

createPatient = (req, res) => {
  const patient_id = req.body.patientId;
  const age = req.body.age;
  const sex = req.body.sex;
  const bmi = req.body.bmi;
  const zip_code = req.body.zipcode;

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

updatePatient = (req, res) => {
  Patient.findByIdAndUpdate(req.params.id, req.body)
    .then(patient => res.json('Updated succesfully'))
    .catch(err => res.status(400).json('Error: ' + err));
};

deletePatient = async (req, res) => {
  await Patient.findByIdAndDelete(req.params.id)
    .then(() => res.json('Patient deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
  getPatients,
  getByPatientId,
  createPatient,
  updatePatient,
  deletePatient,
};
