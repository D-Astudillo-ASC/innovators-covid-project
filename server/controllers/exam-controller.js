const Exam = require('../models/exam-model.js');
const Patient = require('../models/patient-model.js');
const storage_link = 'https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/';
const img_type = '.png';

getExams = async (req, res) => {
  await Exam.find().then(exams => {
    let patientPromises = exams.map(exam => {
      const patientId = exam['patient_Id'];
      return Patient.find({ PATIENT_ID: patientId });
    });

    Promise.all(patientPromises).then(values => {
      let idx = 0;
      values.forEach(value => {
        let patientObj = value[0];

        let curExam = exams[idx]['_doc'];
        Object.assign(curExam, {
          age: patientObj['_doc']['AGE'],
          sex: patientObj['_doc']['SEX'],
          latest_bmi: patientObj['_doc']['LATEST_BMI'],
        });
        idx++;
      });
      res.json(exams);
    });
  });
};

getExam = async (req, res) => {
  await Exam.find({ patient_Id: req.query.patient_Id, exam_Id: req.query.exam_Id }).then(exam => {
    console.log(exam);
    res.json(exam);
  });
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

// deleteExamById = async (req, res) => {
//   await Exam.findOneAndRemove({EXAM_ID: examId})
//   await Exam.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exam deleted!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// };

module.exports = {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
};
