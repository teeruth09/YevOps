const { createPayment } = require('../service/payment');


const create = async (req, res) => {
    try {
        const paymentResult = await  createPayment(req.body);
        res.status(200).send(paymentResult);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { create };