const Order = require('../models/order'); 
const mongoose = require('mongoose');

const createPayment = async (formData) => {
    try {
        const updatedOrder = await updatePay(formData.orderid);

        return updatedOrder;
    } catch (error) {
        console.error('Error in requestPayment:', error);
        throw error;
    }
}

const updatePay = async (orderid) => {
    try {
        const id = new mongoose.Types.ObjectId(orderid);
        const order = await Order.findOne({_id: id });
        if (!order) {
            throw new Error('Order not found for the given order ID');
        }
        if ( order.status === 'Accepted' )  {
            order.pay = true;
        }
        else {
            order.pay = false;
        }
        await order.save();

        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};



module.exports = { createPayment};