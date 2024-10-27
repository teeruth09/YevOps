const { model } = require("mongoose");
const {createOrderTypes,getOrderTypeIds,fetchAllShopOrderType} = require("../service/orderTypeService")
const jwt = require('jsonwebtoken')
const config = process.env
const Shop = require('../models/shop');

//Cotroller to handle create multiple OrderTypes and updating Shop
const createOrderTypesController = async (req, res) =>{
    try{
        // Decode the token to get the shopId
        const token = req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required')
        }
        const {user_id} = jwt.verify(token, config.TOKEN_KEY);
        const shopId = user_id;
        // console.log("print shopId",shopId)
        // const {shopId, orderTypes} = req.body;
        const { orderTypes } = req.body;

        const createdOrderTypes = await createOrderTypes(shopId, orderTypes);
        res.status(201).json({
            message: "OrderTypes create and add to the Shop",
            orderTypes: createdOrderTypes
        });
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const getOrderTypeIdsController = async (req,res) =>{
    try{
        const {orderTypeId} = req.body;

        const findOrderTypeIdDetail = await getOrderTypeIds(orderTypeId);
        res.status(201).send(findOrderTypeIdDetail)
    }catch(error){
        console.error(error);
        res.status(500).json({message: error.message});        
    }
}

const fetchAllShopOrderTypeController = async (req, res) =>{
    try {
        const profile = await fetchAllShopOrderType(req)
        res.status(200).send(profile)
      } catch (err) {
        if (err.message === 'User not Found') {
          return res.status(404).send(err.message)
        }
        console.error(err)
        res.status(500).send('Internal Server Error')
      }
}

module.exports = {createOrderTypesController,getOrderTypeIdsController,fetchAllShopOrderTypeController}