const mongoose = require('mongoose');

const clientSizeSchema = new mongoose.Schema({
    // clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    shirtLength: { type: String,default: "0"},
    chestSize: { type: String, default: "0" },
    waistline: { type: String ,default: "0"},
    hip: { type: String ,default: "0"},
    waistShirt: { type: String ,default: "0"},
    hipShirt: { type: String, default: "0" },
    thigh: { type: String ,default: "0"},
    crotch: { type: String, default: "0" },
    shoulder: { type: String, default: "0" },
    armLength: { type: String,default: "0" },
    calf: { type: String ,default:"0"},
    tipLeg: { type: String ,default:"0"},
    legLength: { type: String , default:"0"},
    upperArm: { type: String ,default:"0"}
});

module.exports = mongoose.model('ClientSize', clientSizeSchema);