const Order = require('../models/order'); 

const createPayment = async (formData) => {
    try {
        const statusData = { status: requestData.status };

        const updatedOrder = await updateStatus(statusData, orderid);

        return updatedOrder;
    } catch (error) {
        console.error('Error in requestPayment:', error);
        throw error;
    }
}

const updateStatus = async (statusData, orderid) => {
    try {
        const order = await Order.findOne({ where: { orderId: orderid } });

        if (!order) {
            throw new Error('Order not found for the given user ID');
        }

        order.pay = statusData;
        await order.save();

        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};



module.exports = { pullRequestOrder, manageOrder, createOrder};