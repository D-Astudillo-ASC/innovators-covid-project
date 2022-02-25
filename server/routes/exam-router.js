const express = require('express');

const ExamController = require('../controllers/exam-controller.js');

const router = express.Router();

router.get('/exams', ExamController.getExams);
router.get('/exam/:id', ExamController.getExamById);
router.post('/exam', ExamController.createExam);
router.put('/exam/:id', ExamController.updateExam);
router.delete('/exam/:id', ExamController.deleteExam);

module.exports = router;
