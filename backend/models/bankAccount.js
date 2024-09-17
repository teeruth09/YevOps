const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    display: { type: String},
    bankName: { type: String},
    branchName: { type: String },
    branchNumber: { type: String },
    branchAddress: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    region: { type: String },
    postal: { type: String},
    country: { type: String }
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
