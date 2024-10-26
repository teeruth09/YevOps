const { model } = require("mongoose");
const {createOrderTypes,getOrderTypeIds} = require("../service/orderTypeService")

//Cotroller to handle create multiple OrderTypes and updating Shop
const createOrderTypesController = async (req, res) =>{
    try{
        const {shopId, orderTypes} = req.body;

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

module.exports = {createOrderTypesController,getOrderTypeIdsController}