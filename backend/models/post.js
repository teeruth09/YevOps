const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client' 
    },
    title: {type: String},
    genre: [{type: String}],
    userRequestDescription: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'UserRequestDescription' 
    },
    createdAt: {type: Date}
})

module.exports = mongoose.model('Post', postSchema);