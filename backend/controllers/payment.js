const { createPayment } = require('../service/payment');


const create = async (req, res) => {
    try {
        const res = await  createPayment(req.body);
        res.status(200).send(res);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { create };