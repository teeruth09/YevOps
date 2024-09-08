const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const config = process.env;


const fetchProfile = async (req) => {

    const token = req.body.token || req.query.token || req.headers['x-acess-token'];
    
    const { user_id } = jwt.verify(token, config.TOKEN_KEY);

    const user = await User.findById(user_id);
    
    if (user) {

        const profile = {
            phone: user.phone,
            address: user.address,
        };

        if (user.role == "user") {

            Object.assign(profile, {
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                dob: user.dob,
                name: user.name,
                sizes: user.sizes
            });

        }

        else if (user.role == "online shop") {

            Object.assign(profile, {
                shop_name: user.shop_name,
                name: user.name,
                shop_desc: user.shop_desc,
                shop_loca: user.shop_loca
            });

        }

        return profile
    }

    else {
        throw new Error("User not Found")
    }

}

const updateProfile = async (req) => {

    const token = req.body.token || req.query.token || req.headers['x-acess-token'];
    const { user_id } = jwt.verify(token, config.TOKEN_KEY);

    const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });

    if (user) {
        
        const profile = {
            phone: user.phone,
            address: user.address,
        };

        if (user.role == "user") {

            Object.assign(profile, {
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                dob: user.dob,
                name: user.name,
                sizes: user.sizes
            });

        }

        else if (user.role == "online shop") {

            Object.assign(profile, {
                shop_name: user.shop_name,
                name: user.name,
                shop_desc: user.shop_desc,
                shop_loca: user.shop_loca
            });

        }

        return profile
    }

    else {
        throw new Error("User not Found")
    }


}

module.exports = { fetchProfile, updateProfile };
