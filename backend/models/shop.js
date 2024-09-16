const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    role: { 
        type: String, 
    },
    email: { 
        type: String, 
    },
    username: {type: String}, 
    password: { type: String},
    location: {type: String},
    idCardNumber: {type: Number},
    registerDate: {type: Date},
    isVerified: {type: Boolean},
    shopName: {type: String},
    shopProfile: {type: String},
    shopDescription: {type: String},
    startBudget: {type: Number},
    stopBudget: {type: Number},
    previewImage: [{type: String}],
    token: { type: String },
    orderTypeIds: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'OrderType' 
    }],
    phone: {type: Number},
    address: {type: String},
    gender: {type: String},
    idCardNumber: {type: Number},
    birthdate: {type: Date},
    firstname: {type: String},
    lastname: {type: String},
});

module.exports = mongoose.model('Shop', shopSchema);