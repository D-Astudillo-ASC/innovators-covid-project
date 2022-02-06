const express = require('express');

const PatientController = require('../controllers/patient-controller.js');

const router = express.Router();

router.get('/patients', PatientController.getItems);
router.get('/patient/:id', PatientController.getItemById);
router.post('/patient', PatientController.createItem);
router.put('/patient/:id', PatientController.updateItem);
router.delete('/patient/:id', PatientController.deleteItem);

module.exports = router;