const mongoose = require('mongoose');

const userRequestDescriptionSchema = new mongoose.Schema({
    clothType: { type: String},
    budgetStart: { type: Number},
    budgetStop: { type: Number},
    deadline: { type: Date },
    referenceImage: [{type: String}]
});

module.exports = mongoose.model('UserRequestDescription', userRequestDescriptionSchema);
