const Shop = require('../models/shop');

const searchName = async (req) => {
    
    try {
        const keyword = req.query.keyword; 
        
        if (!keyword) {
            throw new Error('Keyword is required');
        }

        const shops = await Shop.find({ shopName: { $regex: `^${keyword}`, $options: 'i' } }); // find shop that name start with keyword, case insensitive

        if (shops.length === 0) {
            throw new Error('No Shop Found');
        }

        return shops;
    } catch (err) {
        throw new Error(err.message || 'Error searching for shops' );
    }
};

module.exports = { searchName };