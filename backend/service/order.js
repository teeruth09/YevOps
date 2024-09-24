const UserRequestDescription = require('../models/userRequestDescription');
const Order = require('../models/order'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const config = process.env;
const Shop = require('../models/shop');

const createOrder = async (orderData, userid) => {
    const { shopId, clientSize, orderType, userRequestDescription, billingInfo, customerInfo, deadline,shopReplyDescription,createAt,price} = orderData;

    // Step 1: Fetch user info by userid
    const user = await Client.findById(userid); // Assuming Client is the model for users
    
    if (!user) {
        throw new Error('User not found');
    }

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
    // shopReplyDescription: {type: mongoose.Schema.Types.ObjectId, ref: 'ShopReplyDescription'},
    // createAt: {type: Date, default: Date.now},
    // price: {type: Number},

    const userRequest = await UserRequestDescription.create({
        clothType: userRequestDescription.clothType,
        budgetStart: userRequestDescription.budgetStart,
        budgetStop: userRequestDescription.budgetStop,
        deadline: userRequestDescription.deadline,
        referenceImage: userRequestDescription.referenceImage,
    });


    const order = await Order.create({
        shopId,
        clientId:userid,
        clientSize:user.clientSize,
        orderType,
        status:"Pending",
        userRequestDescription: userRequest._id, // Reference the UserRequestDescription's ObjectId
        billingInfo,
        customerInfo:user.address,
        deadline: userRequest.deadline,
        pay:false,
        createAt,
        price: userRequest.budgetStart
    });
    console.log("Order",order)
    return order
}

const manageOrder = async (requestData) => {
    try {
        console.log('Request Data:', requestData); // Log incoming request data
        const statusData = requestData.status ;
        const orderid = requestData.orderid; // Make sure you have orderid from the requestData

        const updatedOrder = await updateStatus(statusData, orderid);

        return updatedOrder;
    } catch (error) {
        console.error('Error in requestOrder:', error);
        throw error;
    }
};

const pullRequestOrder = async (req) => {
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required');
        }
        const { user_id } = jwt.verify(token, config.TOKEN_KEY);
        let user = await Shop.findById(user_id);

        if (!user) {
            throw new Error("User not Found");
        }
        // console.log(user);
        const orders = await Order.find({shopId: user._id})
            .populate('shopId', 'shopName imageProfile previewImage shopDescription') // Populate shop details (only fetch shopName, imageProfile, and previewImage)
            .populate('clientId', 'firstname lastname phone address imageProfile username') // Populate client details (only fetch relevant client info)
            .populate('userRequestDescription', 'clothType budgetStart budgetStop referenceImage');
        if (!orders || orders.length === 0) {
            return { status: 404, message: "No orders found for this client." };
        }

        return { status: 200, data: orders }; // Returning the orders and status


        // const orders = await Order.find({ shopId: pullData.shopid });
        // return orders;
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
        console.log("Update status",order.status)
        return order;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

const getOrderHistory = async (req) =>{
    try{
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required');
        }

        const { user_id } = jwt.verify(token, config.TOKEN_KEY);

        let user = await Client.findById(user_id);

        if (!user) {
            throw new Error("User not Found");
        }
        // console.log(user);
        const orders = await Order.find({clientId: user._id})
            .populate('shopId', 'shopName imageProfile previewImage shopDescription') // Populate shop details (only fetch shopName, imageProfile, and previewImage)
            .populate('clientId', 'firstname lastname phone address username'); // Populate client details (only fetch relevant client info)

        if (!orders || orders.length === 0) {
            return { status: 404, message: "No orders found for this client." };
        }

        return { status: 200, data: orders }; // Returning the orders and status
    }catch(error){
        console.error('Error fetching order history:', error);
        throw new Error("Error fetching order history"); // Handle error properly
    }
}


const getOrderDetail = async (orderid) =>{
    try{
        const order = await Order.findById(orderid)
            .populate('shopId', 'shopName imageProfile previewImage shopDescription') // Populate shop details (only fetch shopName, imageProfile, and previewImage)
            .populate('clientId', 'firstname lastname phone address clientSize imageProfile') // Populate client details (only fetch relevant client info)
            .populate('userRequestDescription', 'clothType budgetStart budgetStop referenceImage');

        if (!order) {
            return res.status(404).send('Order not found.');
        }
        return order;
    }catch(error){
        console.error('Error fetch order detail:', error);
        throw error;
    }
}


module.exports = { pullRequestOrder, manageOrder, createOrder, getOrderHistory, getOrderDetail};