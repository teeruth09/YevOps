const { pullRequestOrder, manageOrder, createOrder } = require('../service/order');


const order = async (req, res) => {
    try {
        const order = await  createOrder(req.body,req.user.user_id);
        res.status(201).send(order._id);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const requests = async (req, res) => {
    try {
        const orders = await  pullRequestOrder(req.body);
        res.status(200).send(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const manage = async (req, res) => {
    try {
        const request = await  manageOrder(req.body,req.order.order_id);
        res.status(200).send(request._id);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}



module.exports = { manage, requests, order };