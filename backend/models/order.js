const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    uniqueID: { type: String},
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop'}, 
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    clientSize: { type: String },
    orderType: { type: String},
    packageType: { type: String },
    status: { type: String, enum: ['Rejected', 'Accepted', 'Pending', 'Payment','In Progress','Canceled','Sending','Due Dated','Delivered','Complete-Not Review','Complete Review'] },
    userRequestDescription: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRequestDescription' },
    billingInfo: { type: String },
    customerInfo: { type: String },
    deadline: { type: Date },
    total: { type: Number},
    code: { type: String },
    discount: { type: Number },
    serviceFee: { type: Number },
    pay: { type: Boolean},
    paymentMethod: { type: String },
    shopReplyDescription: {type: mongoose.Schema.Types.ObjectId, ref: 'ShopReplyDescription'},
    createAt: {type: Date, default: Date.now},
    price: {type: Number},
});

module.exports = mongoose.model('Order', orderSchema);