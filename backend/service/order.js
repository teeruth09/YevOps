const Order = require('../models/order'); 

const createOrder = async (orderData, userid) => {
    const { store, price, type_cloth, start, end} = orderData;

    const status = "pending";
    const order = await Order.create({
        userid,
        store,
        price,
        type_cloth,
        status,
        start,
        end
    });

    return order
}


const updateStatus = async (statusData, userid) => {
    const { status } = statusData;

    try {
        const order = await Order.findOne({ where: { userId: userid } });

        if (!order) {
            throw new Error('Order not found for the given user ID');
        }

        order.status = status;
        await order.save();

        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};


module.exports = { createOrder, updateStatus};