const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Patient = new Schema(
    {
        //patient_id: new mongoose.Mongoose.Types.ObjectId,
        patient_id: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true
        },
        sex: {
            type: String,
            required: true
        },
        bmi: {
            type: Number,
            required: true
        },
        zip_code: {
            type: Number,
            required: true
        },
    },
);

// export module and save objects to collection patients in db MedicalData
module.exports = mongoose.model('patient', Patient, 'patients');