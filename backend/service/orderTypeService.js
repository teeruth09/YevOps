const Shop = require('../models/shop');
const OrderType = require('../models/orderType');

const createOrderTypes = async(shopId, orderTypes) =>{
    //Check if the shop exits
    const shop = await Shop.findById(shopId);
    if(!shop){
        throw new Error('Shop not found');
    }

    //Create multiple OrderTypes
    const createdOrderTypes = await OrderType.insertMany(
        orderTypes.map(orderType => ({
            shopId,
            name: orderType.name,
            price: orderType.price,
            detail: orderType.detail,
            deadline: orderType.deadline,
          }))
    );
    console.log('Created OrderTypes:', createdOrderTypes);

    // Get the newly created OrderType IDs
    const orderTypeIds = createdOrderTypes.map(orderType => orderType._id);

    // Add the OrderType IDs to the Shop's orderTypeIds array
    shop.orderTypeIds.push(...orderTypeIds);
    
    // Save the updated Shop
    await shop.save();

    return createdOrderTypes;
}

const getOrderTypeIds = async (orderTypeId) =>{
    const orderType = await OrderType.findById(orderTypeId)
    console.log("kokoakokekoa",orderTypeId)
    if(!orderType){
        throw new Error('This OrderType Id is not found');
    }
    // Return the array of orderTypeIds
    return orderType;
}

module.exports = {createOrderTypes,getOrderTypeIds}