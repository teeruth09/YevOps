const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop'}, 
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    clientSize: { type: String },
    orderType: { type: String},
    status: { type: String, enum: ['rejected', 'accepted', 'pending'] },
    userRequestDescription: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRequestDescription' },
    billingInfo: { type: String },
    customerInfo: { type: String },
    deadline: { type: Date },
    total: { type: Number},
    code: { type: String },
    discount: { type: Number },
    serviceFee: { type: Number },
    pay: { type: Boolean},
    paymentMethod: { type: String }
});

module.exports = mongoose.model('Order', orderSchema);