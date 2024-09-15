const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    display: { type: String},
    bankName: { type: String},
    branchName: { type: String },
    branchNumber: { type: Number },
    branchAddress: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    region: { type: String },
    postal: { type: Number},
    country: { type: String }
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
