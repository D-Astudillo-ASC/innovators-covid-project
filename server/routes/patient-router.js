const express = require('express');

const PatientController = require('../controllers/patient-controller.js');

const router = express.Router();

router.get('/patients', PatientController.getPatients);
router.get('/patient', PatientController.getByPatientId);
router.post('/patient', PatientController.createPatient);
router.put('/patient', PatientController.updatePatient);
router.delete('/patient', PatientController.deletePatient);

module.exports = router;
