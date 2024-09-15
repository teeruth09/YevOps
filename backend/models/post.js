const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop' 
    },
    reviewContent: {type: String},
    rating: {type: Number},
    createdAt: {type: Date}
})

module.exports = mongoose.model('Post', postSchema);