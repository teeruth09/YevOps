const mongoose = require('mongoose')

const orderTypeSchema = new mongoose.Schema({
    shopId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Shop' 
    },
    name: {type: String},
    price: {type: Number},
    detail: {type: String},
    deadline: {type: String}
})

module.exports = mongoose.model('OrderType', orderTypeSchema);