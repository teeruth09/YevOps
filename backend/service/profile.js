const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = process.env;

const fetchProfile = async (req) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required');
        }

        const { user_id } = jwt.verify(token, config.TOKEN_KEY);
        const user = await User.findById(user_id)
            .populate('userDetails shopDetails')
            .populate({
                path: 'userDetails.sizes', 
                model: 'UserSize' 
            });

        if (!user) {
            throw new Error("User not Found");
        }

        const profile = {
            name: user.name,
            address: user.address,
        };

        if (user.role === "user" && user.userDetails) {
            Object.assign(profile, {
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.userDetails.gender,
                dob: user.userDetails.dob,
                phone: user.userDetails.phone,
                sizes: user.userDetails.sizes
            });
        } else if (user.role === "online shop" && user.shopDetails) {
            Object.assign(profile, {
                shop_name: user.shopDetails.shop_name,
                shop_desc: user.shopDetails.shop_desc,
                shop_loca: user.shopDetails.shop_loca,
                phone: user.shopDetails.phone,
            });
        }

        return profile;
    } catch (err) {
        throw new Error(err.message || "Error fetching profile");
    }
};

const updateProfile = async (req) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (!token) {
            throw new Error('Token is required');
        }

        const { user_id } = jwt.verify(token, config.TOKEN_KEY);
        const user = await User.findById(user_id).populate('userDetails shopDetails');

        if (!user) {
            throw new Error("User not Found");
        }

        const updatedFields = {
            address: req.body.address 
        };

        if (user.role === "user" && user.userDetails) {
            await user.updateOne({
                first_name: req.body.first_name,
                last_name: req.body.last_name 
            });
            await user.userDetails.updateOne({
                phone: req.body.phone,
                gender: req.body.gender ,
                dob: req.body.dob ,
                sizes: req.body.sizes 
            });
        } else if (user.role === "online shop" && user.shopDetails) {
            await user.shopDetails.updateOne({
                shop_name: req.body.shop_name ,
                shop_desc: req.body.shop_desc ,
                shop_loca: req.body.shop_loca,
                phone: req.body.phone
            });
        }

        await user.updateOne(updatedFields);
        console.log(user)

        return await fetchProfile(req); 
    } catch (err) {
        throw new Error(err.message || "Error updating profile");
    }
};

module.exports = { fetchProfile, updateProfile };
