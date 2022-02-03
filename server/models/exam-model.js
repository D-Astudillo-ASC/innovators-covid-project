const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Exam = new Schema(
    {
        Exam_id: new Schema.Types.ObjectId,
        patient_id: new Schema.Types.ObjectId,
        image: {
            type: Buffer,
            required: true
        },
        key_fidings: {
            type: String,
            required: false
        },
        Brixia_Scores: {
            type: Array,
            required: true
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('exam', Exam);