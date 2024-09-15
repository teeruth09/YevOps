const mongoose = require('mongoose');

const verifyRequestSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop'}, 
    address: { type: String},
    ket: { type: String },
    kwang: { type: String },
    province: { type: String },
    postalNumber: { type: Number },
    ownerName: { type: String},
    ownerPhone: { type: Number},
    ownerIdCardNumber: { type: Number},
    genre: [{type: String}],
    productDescription: { type: String }
});

module.exports = mongoose.model('VerifyRequest', verifyRequestSchema);