const mongoose = require('mongoose')

const userDetailSchema = new mongoose.Schema({
    gender: { 
        type: String, 
        enum: ['male', 'female', 'other'], 
        default: 'other' 
    },
    dob: { type: Date }, 
    id_card: { type: String },
    phone: { type: String },
    sizes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'UserSize' 
        }
    ],
});

module.exports = mongoose.model('UserDetail', userDetailSchema);