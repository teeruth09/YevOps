const mongoose = require('mongoose');

const shopReplyDescriptionSchema = new mongoose.Schema({
    confirmDeadline: {type: Date},
    confirmPrice: {type: Number}
});

module.exports = mongoose.model('ShopReplyDescription', shopReplyDescriptionSchema);