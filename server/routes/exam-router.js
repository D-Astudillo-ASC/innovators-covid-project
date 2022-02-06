const express = require('express');

const ExamController = require('../controllers/exam-controller.js');

const router = express.Router();

router.get('/exams', ExamController.getItems);
router.get('/exam/:id', ExamController.getItemById);
router.post('/exam', ExamController.createItem);
router.put('/exam/:id', ExamController.updateItem);
router.delete('/exam/:id', ExamController.deleteItem);

module.exports = router;
