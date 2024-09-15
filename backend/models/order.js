const { type } = require('express/lib/response');
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userid: { type: String},
    store: { type: String},
    price: {type: Number},
    type_cloth: {type: String},
    status: {type: String},
    start: {type: Date},
    end:{type:Date}
})

module.exports = mongoose.model('order', orderSchema);