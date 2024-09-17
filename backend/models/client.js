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
    idCardNumber: {type: String},
    phone:{type: String},
    address: { type: String },
    role: { 
        type: String, 
    },
    imageProfile: {type: String, default: 'https://th.bing.com/th/id/OIP.6Vkv1Oyc641507Z8PhZrRgHaHX?w=900&h=895&rs=1&pid=ImgDetMain'},
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