const express = require('express');

const ExamController = require('../controllers/exam-controller.js');

const router = express.Router();

router.get('/exams', ExamController.getExams);
router.post('/exam', ExamController.createExam);
router.get('/exam', ExamController.getExam);
<<<<<<< HEAD
router.put('/exam/:id', ExamController.updateExam);
router.delete('/exam/', ExamController.deleteExam);
=======
router.get('/exams/patient/', ExamController.getExamsByPatientId);
router.put('/exam/:id', ExamController.updateExam);
router.delete('/exam/:id', ExamController.deleteExam);
>>>>>>> origin

module.exports = router;
