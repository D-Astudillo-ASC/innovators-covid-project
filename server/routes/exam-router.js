const express = require('express');

const ExamController = require('../controllers/exam-controller.js');

const router = express.Router();

router.get('/exams', ExamController.getExams);
router.post('/exam', ExamController.createExam);
router.get('/exam', ExamController.getExam);
router.put('/exam/:id', ExamController.updateExam);
router.delete('/exam/:id', ExamController.deleteExam);

module.exports = router;
