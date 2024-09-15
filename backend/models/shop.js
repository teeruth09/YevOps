const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    role: { 
        type: String, 
        enum: ['client', 'shop'], 
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
    }]
});

module.exports = mongoose.model('Shop', shopSchema);