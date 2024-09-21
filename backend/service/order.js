const Order = require('../models/order'); 
const mongoose = require('mongoose');

const createOrder = async (orderData, userid) => {
    const { shopId, clientSize, orderType, userRequestDescription, billingInfo, customerInfo, deadline} = orderData;


    // shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop'}, 
    // clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'}, 
    // clientSize: { type: String },
    // orderType: { type: String},
    // status: { type: String, enum: ['rejected', 'accepted', 'pending'] },
    // userRequestDescription: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRequestDescription' },
    // billingInfo: { type: String },
    // customerInfo: { type: String },
    // deadline: { type: Date },
    // total: { type: Number},
    // code: { type: String },
    // discount: { type: Number },
    // serviceFee: { type: Number },
    // pay: { type: Boolean},
    // paymentMethod: { type: String }

    const order = await Order.create({
        shopId,
        clientId:userid,
        clientSize,
        orderType,
        status:"pending",
        userRequestDescription,
        billingInfo,
        customerInfo,
        deadline,
        pay:false
    });

    return order
}

const manageOrder = async (requestData) => {
    try {
        const statusData = requestData.status ;

        const updatedOrder = await updateStatus(statusData, requestData.orderid);

        return updatedOrder;
    } catch (error) {
        console.error('Error in requestOrder:', error);
        throw error;
    }
};

const pullRequestOrder = async (pullData) => {
    try {
        const orders = await Order.find({ shopId: pullData.shopid });
        return orders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Could not fetch orders");
    }
}

const updateStatus = async (statusData, orderid) => {
    try {
        const id = new mongoose.Types.ObjectId(orderid);
        const order = await Order.findOne({_id: id });
        if (!order) {
            throw new Error('Order not found for the given order ID');
        }

        order.status = statusData;
        await order.save();

        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};



module.exports = { pullRequestOrder, manageOrder, createOrder};