const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null},
    last_name: { type: String, default:null},
    email: {type: String, unique: true},
    password: {type: String},
    token: { type: String},
    shop_name: { type: String },
    gender: { type: String },
    dob: {type: Date}, //date of birth
    id_card: {type: Number},
    phone: {type: Number},
    address: {type: String},
    role: {type: String},
    name: {type: String},
    shop_desc: {type: String, default: ""},
    shop_loca: { type: String, default: ""},
    sizes: [
        {
            owner: { type: String, default: "" }, 
            s_len: { type: Number, default: 0 }, //เสื้อยาว
            s_chest: { type: Number, default: 0 }, //รอบอก 
            s_waist: { type: Number, default: 0 }, //เอวเสื้อ
            s_hip: { type: Number, default: 0 }, //สะโพกเสื้อ
            s_shoulder: { type: Number, default: 0 }, //ไหล่
            s_arm: { type: Number, default: 0 }, //แขนยาว
            p_waist: { type: Number, default: 0 }, //รอบเอว
            p_hip: { type: Number, default: 0 }, //สะโพก
            p_thigh: { type: Number, default: 0 }, //ต้นขา
            p_crotch: { type: Number, default: 0 }, //เป้า
            p_calf: { type: Number, default: 0 }, //น่องขา
            p_tip: { type: Number, default: 0 }, //ปลายขา
        }
    ],
})

module.exports = mongoose.model('user', userSchema);