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
    idCardNumber: {type: String},
    registerDate: {type: Date, default: Date.now},
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
    phone: {type: String},
    address: {type: String},
    gender: {type: String},
    idCardNumber: {type: String},
    birthdate: {type: Date},
    firstname: {type: String},
    lastname: {type: String},
    imageProfile: {type: String, default: 'https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain'},
});

module.exports = mongoose.model('Shop', shopSchema);