const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    email: { 
        type: String
    },
    password: { type: String},
    firstname: { type: String},
    lastname: { type: String},
    gender: {type: String},
    birthdate: {type: Date},
    idCardNumber: {type: Number},
    phone:{type: Number},
    address: { type: String },
    role: { 
        type: String, 
    },
    imageProfile: {type: String},
    favouriteShop: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Shop' 
        }
    ],
    username: {type: String}, 
    token: { type: String },
})

module.exports = mongoose.model('Client', clientSchema);