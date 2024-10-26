const UserRequestDescription = require('../models/userRequestDescription');
const Order = require('../models/order'); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Client = require('../models/client');
const config = process.env;
const Shop = require('../models/shop');
const ShopReplyDescription = require('../models/shopReplyDescription');

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const { uploadFile, getFileStream } = require('../configs/s3')


const createOrder = async (orderData, userid, referenceImage) => {
    const { shopId, clientSize, orderType, userRequestDescription, billingInfo, customerInfo, deadline,shopReplyDescription,createAt,price} = orderData;

    // Step 1: Fetch user info by userid
    const user = await Client.findById(userid); // Assuming Client is the model for users
    
    if (!user) {
        throw new Error('User not found');
    }
    
    const file = referenceImage
    let uploadResult = ''
    if(file){
    //   console.log("siajigjai",file)
      uploadResult = await uploadFile(file)
      await unlinkFile(file.path)
      console.log(uploadResult)
      console.log(uploadResult.Key)
    }
    console.log("userRequestDescription", userRequestDescription)

    let userRequestObj;
    try {
        // Check if userRequestDescription is a string and parse it
        if (typeof userRequestDescription === 'string') {
            userRequestObj = JSON.parse(userRequestDescription);
        } else {
            userRequestObj = userRequestDescription; // It's already an object
        }
    } catch (error) {
        console.error("Error parsing userRequestDescription:", error);
        // Handle the error as appropriate, e.g., return or set a default value
        return;
    }
    console.log("Key",uploadResult.Key)
    imageRefApi = `http://localhost:5555/images/${uploadResult.Key}`
    const userRequest = await UserRequestDescription.create({
        clothType: userRequestObj.clothType,
        budgetStart: userRequestObj.budgetStart,
        budgetStop: userRequestObj.budgetStop,
        deadline: userRequestObj.deadline,
        referenceImage: imageRefApi,
    });
    console.log("userReques2222", userRequest)   
 

    const currentDate = new Date();


    if (userRequest.deadline.getTime() > currentDate.getTime()) {
        
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

    else {
        console.log("Fail")
        return { status: 404, message: "Fail create order." };

    }
}

const manageOrder = async (requestData) => {
    try {
        console.log('Request Data:', requestData); // Log incoming request data
        const statusData = requestData.status ;
        const orderid = requestData.orderid; // Make sure you have orderid from the requestData
        const shopReplyDescription = requestData.shopReplyDescription;

        const updatedOrder = await updateStatus(statusData, orderid, shopReplyDescription);

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

const updateStatus = async (statusData, orderid, shopReplyDescription) => {
    try {
        const id = new mongoose.Types.ObjectId(orderid);
        const order = await Order.findOne({_id: id });
        if (!order) {
            throw new Error('Order not found for the given order ID');
        }

        //check if status == Pending (NewRequest) and we have shopReplyData to update
        console.log('orderStatus:', order.status);
        console.log('shopReplyDescription Data:', shopReplyDescription);


        if(order.status === 'Pending' && shopReplyDescription){
            //create a new ShopReplyDescription document
            const newShopReplyDescription =  new ShopReplyDescription({
                confirmDeadline: shopReplyDescription.confirmDeadline,  
                confirmPrice: shopReplyDescription.confirmPrice,
            });
            //Save the new ShopReplyDescription
            const savedShopReplyDescription = await newShopReplyDescription.save();
            //Update the order with the new shopReplyDescription ID
            order.shopReplyDescription = savedShopReplyDescription._id;
        }
        else if(order.status === 'Pending' && statusData === 'Payment'){
            const newShopReplyDescription =  new ShopReplyDescription({
                confirmDeadline: order.deadline,  
                confirmPrice: order.price,
            });
            //Save the new ShopReplyDescription
            const savedShopReplyDescription = await newShopReplyDescription.save();
            //Update the order with the new shopReplyDescription ID
            order.shopReplyDescription = savedShopReplyDescription._id;
        }
        if(order.status === 'Payment' && statusData === 'In Progress'){
            const shopReplyData = await ShopReplyDescription.findOne({_id: order.shopReplyDescription})
            console.log('shopReplyData:',shopReplyData)
            order.price = shopReplyData.confirmPrice
            order.deadline = shopReplyData.confirmDeadline
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
            .populate('userRequestDescription', 'clothType budgetStart budgetStop referenceImage')
            .populate('shopReplyDescription', 'confirmDeadline confirmPrice')

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