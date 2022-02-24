const Exam = require('../models/exam-model.js');
const storage_link = 'https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/';
const img_type = '.png';

getExams = async (req, res) => {
  await Exam.find()
    .then(exams => res.json(exams))
    .catch(err => res.status(400).json('Error: ' + err));
};

getExamById = async (req, res) => {
  await Exam.findById(req.params.id)
    .then(exam => res.json(exam))
    .catch(err => res.status(400).json('Error: ' + err));
};

createExam = (req, res) => {
  const patient_id = req.body.examPatientId;
  const exam_Id = req.body.examId;
  const image_url = req.body.imageUrl;
  const key_findings = req.body.keyFindings;
  const brixia_scores = req.body.brixiaScores;

  // build new exam object
  const newExam = new Exam({
    patient_id,
    exam_Id,
    image_url,
    key_findings,
    brixia_scores,
  });

  // save new exam into database
  newExam
    .save()
    .then(() => res.json('Exam added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

updateExam = (req, res) => {
  Exam.findByIdAndUpdate(req.params.id, req.body)
    .then(exam => res.json('Updated succesfully'))
    .catch(err => res.status(400).json('Error: ' + err));
};

deleteExam = async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exam deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
  getExams,
  getExamById,
  createExam,
  updateExam,
  deleteExam,
};
