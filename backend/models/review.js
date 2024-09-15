const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop' 
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client' 
    },
    reviewContent: {type: String},
    rating: {type: Number},
    createdAt: {type: Date}
})

module.exports = mongoose.model('Review', reviewSchema);