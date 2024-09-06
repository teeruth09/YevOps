const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null},
    last_name: { type: String, default:null},
    email: {type: String, unique: true},
    password: {type: String},
    gender: { type: String },
    dob: {type: Date}, //date of birth
    id_card: {type: Number, unique: true},
    phone: {type: Number, unique: true},
    address: {type: String},
    role: {type: String},
    user_name: {type: String, unique: true},
    sizes: [
        {
            owner: { type: String }, 
            s_len: { type: Number }, //เสื้อยาว
            s_chest: { type: Number }, //รอบอก 
            s_waist: { type: Number }, //เอวเสื้อ
            s_hip: { type: Number }, //สะโพกเสื้อ
            s_shoulder: { type: Number }, //ไหล่
            s_arm: { type: Number }, //แขนยาว
            p_waist: { type: Number }, //รอบเอว
            p_hip: { type: Number }, //สะโพก
            p_thigh: { type: Number }, //ต้นขา
            p_crotch: { type: Number }, //เป้า
            p_calf: { type: Number }, //น่องขา
            p_tip: { type: Number }, //ปลายขา
        }
    ],
    token: { type: String}
})

module.exports = mongoose.model('user', userSchema);