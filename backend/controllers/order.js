const { createOrder, updateStatus } = require('../service/order');


const order = async (req, res) => {
    try {
        const order = await  createOrder(req.body,req.user.user_id);
        res.status(201).send(order._id);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const statusOrder = async (req, res) => {
    try {
        const order = await  updateStatus(req.body,req.user.user_id);
        res.status(200).send(order._id);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { order, statusOrder };