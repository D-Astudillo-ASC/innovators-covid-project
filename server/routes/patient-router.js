const express = require('express');

const PatientController = require('../controllers/patient-controller.js');

const router = express.Router();

router.get('/patients', PatientController.getPatients);
router.get('/patient/:id', PatientController.getPatientById);
//router.get('/patient:PATIENT_ID', PatientController.getByPatientId);
router.post('/patient', PatientController.createPatient);
router.put('/patient/:id', PatientController.updatePatient);
router.delete('/patient/:id', PatientController.deletePatient);

module.exports = router;
