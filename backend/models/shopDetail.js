const mongoose = require('mongoose')

const shopDetailSchema = new mongoose.Schema({
    shop_name: { type: String},
    shop_desc: { type: String, default: "" },
    shop_loca: { type: String, default: "" },
    phone: { type: String },
    
});

module.exports = mongoose.model('ShopDetail', shopDetailSchema);