const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        patient_id: new Schema.Types.ObjectId,
        Age: {
            type: Number,
            required: true
        },
        Sex: {
            type: String,
            required: true
        },
        BMI: {
            type: Number,
            required: true
        },
        zip_code: {
            type: Number,
            required: true
        },
    },
);

module.exports = mongoose.model('patient', Patient);