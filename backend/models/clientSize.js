const mongoose = require('mongoose');

const clientSizeSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    shirtLength: { type: Number },
    chestSize: { type: Number },
    waistline: { type: Number },
    hip: { type: Number },
    waistShirt: { type: Number },
    hipShirt: { type: Number },
    thigh: { type: Number },
    crotch: { type: Number },
    shoulder: { type: Number },
    armLength: { type: Number },
    calf: { type: Number },
    tipLeg: { type: Number },
    legLength: { type: Number },
    upperArm: { type: Number }
});

module.exports = mongoose.model('ClientSize', clientSizeSchema);