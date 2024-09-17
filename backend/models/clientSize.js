const mongoose = require('mongoose');

const clientSizeSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    shirtLength: { type: String },
    chestSize: { type: String },
    waistline: { type: String },
    hip: { type: String },
    waistShirt: { type: String },
    hipShirt: { type: String },
    thigh: { type: String },
    crotch: { type: String },
    shoulder: { type: String },
    armLength: { type: String },
    calf: { type: String },
    tipLeg: { type: String },
    legLength: { type: String },
    upperArm: { type: String }
});

module.exports = mongoose.model('ClientSize', clientSizeSchema);