const { pullRequestOrder, manageOrder, createOrder, getOrderHistory, getOrderDetail } = require('../service/order');


const order = async (req, res) => {
    console.log("File co",req.file)
    try {
        const order = await  createOrder(req.body,req.user.user_id,req.file);
        res.status(201).send(order._id);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const requests = async (req, res) => {
    try {
        // Call the service to get the order history
        const result = await pullRequestOrder(req);

        if (result.status === 404) {
            return res.status(404).send(result.message);
        }

        res.status(200).json(result.data); // Sending the orders back as JSON

        // const orders = await  pullRequestOrder(req.body);
        // res.status(200).send(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

const manage = async (req, res) => {
    try {
        const request = await  manageOrder(req.body);
        if (request.status === 404) {
            console.log("Message",request.message)
            return res.status(404).send(request.message);
        }
        res.status(200).send(request._id);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


const getOrderHistoryController = async (req, res) => {
    try {
        // Call the service to get the order history
        const result = await getOrderHistory(req);

        if (result.status === 404) {
            return res.status(404).send(result.message);
        }

        res.status(200).json(result.data); // Sending the orders back as JSON
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};


const getOrderDetailController = async (req, res) =>{
    try{
        const result = await getOrderDetail(req.params.id);
        if (result.status === 404) {
            return res.status(404).send(result.message);
        }
        res.status(200).json(result); // Sending the orders back as JSON
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = { manage, requests, order, getOrderHistoryController, getOrderDetailController };