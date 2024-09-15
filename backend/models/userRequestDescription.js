const mongoose = require('mongoose');

const userRequestDescriptionSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop'},
    name: { type: String},
    price: { type: Number},
    detail: { type: String },
    deadline: { type: Date }
});

module.exports = mongoose.model('UserRequestDescription', userRequestDescriptionSchema);
