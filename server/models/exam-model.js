const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        //Exam_id: new mongoose.Mongoose.Types.ObjectId,
        //patient_id: new mongoose.Mongoose.Types.ObjectId,

        patient_id: {
            type: String,
            required: true,
        },

        exam_id: {
          type: String,
          required: true,
        },

        image_url: {
            type: String,
            required: false
        },
        xray_type: {
            type: String,
            required: false,
        },

        key_findings: {
            type: String,
            required: false
        },
        brixia_scores: {
            type: Array,
            required: true
        },
    },
    { timestamps: true },
);

// export module and save objects to collection exams in db MedicalData
module.exports = mongoose.model('exam', Exam, 'exams');