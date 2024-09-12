const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { 
        type: String, 
        unique: true, 
        required: true, 
    },
    password: { type: String, required: true },
    address: { type: String },
    token: { type: String },
    role: { 
        type: String, 
        enum: ['user', 'online shop'], 
        required: true 
    },
    name: {type: String, required: true, unique: true}, 
    userDetails: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserDetail' 
    }, 
    shopDetails: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ShopDetail' 
    },

})

module.exports = mongoose.model('User', userSchema);