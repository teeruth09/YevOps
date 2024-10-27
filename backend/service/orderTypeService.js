const jwt = require('jsonwebtoken')
const Shop = require('../models/shop');
const OrderType = require('../models/orderType');
const config = process.env

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
    // console.log("kokoakokekoa",orderTypeId)
    if(!orderType){
        throw new Error('This OrderType Id is not found');
    }
    // Return the array of orderTypeIds
    return orderType;
}

const fetchAllShopOrderType = async (req) =>{
    try {
        const token =
          req.body.token || req.query.token || req.headers['x-access-token']
        if (!token) {
          throw new Error('Token is required')
        }
    
        const { user_id } = jwt.verify(token, config.TOKEN_KEY)
    
        let user = await Shop.findById(user_id)
        if (!user) {
          throw new Error('User not Found')
        }
    
        const profile= {
            shopName: user.shopName,
            orderTypeIds: user.orderTypeIds
        }
        
        //fetch all orderType details for each id
        const orderTypeDetails = await Promise.all(
            profile.orderTypeIds.map(async (orderTypeId) => {
                return await getOrderTypeIds(orderTypeId); // fetches each orderType detail
            })
        )
        // Include the detailed orderTypes in the profile response
        return { ...profile, orderTypeDetails };
      } catch (err) {
        throw new Error(err.message || 'Error fetching profile')
    }
}

module.exports = {createOrderTypes,getOrderTypeIds,fetchAllShopOrderType}