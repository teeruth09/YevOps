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

const manageOrder = async (requestData, orderid) => {
    try {
        const statusData = { status: requestData.status };

        const updatedOrder = await updateStatus(statusData, orderid);

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
        const order = await Order.findOne({ where: { orderId: orderid } });

        if (!order) {
            throw new Error('Order not found for the given user ID');
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