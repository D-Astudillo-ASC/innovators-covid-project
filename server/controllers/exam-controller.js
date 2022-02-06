const Exam = require('../models/exam-model.js');
const storage_link = 'https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/';
const img_type = '.png';

getItems = async (req, res) => {
    await Exam.find()
        .then(exams => res.json(exams))
        .catch(err => res.status(400).json('Error: ' + err));
};

getItemById = async (req, res) => {
    await Exam.findById(req.params.id)
        .then(exam => res.json(exam))
        .catch(err => res.status(400).json('Error: ' + err));
};

createItem = (req, res) => {
    const patient_id = req.body.patient_id;
    const exam_id = req.body.exam_id;
    const image_url = storage_link + patient_id + req.body.xray_type + exam_id + img_type;
    const key_findings = req.body.key_findings;
    const brixia_scores = (req.body.brixia_scores.toString());

    // build new exam object
    const newExam = new Exam({
        patient_id,
        exam_id,
        image_url,
        key_findings,
        brixia_scores,
    });

    // save new patient into database
    newExam.save()
    .then(() => res.json('Exam added!'))
    .catch(err => res.status(400).json('Error: ' + err));
};

updateItem = (req, res) => {
    Exam.findByIdAndUpdate(req.params.id, req.body)
        .then(exam => res.json('Updated succesfully'))
        .catch(err => res.status(400).json('Error: ' + err));
};

deleteItem = async (req, res) => {
    await Exam.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exam deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
};