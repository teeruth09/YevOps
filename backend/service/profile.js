const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const config = process.env;


const fetchProfile = async (req) => {

    const token = req.body.token || req.query.token || req.headers['x-acess-token'];
    
    const { user_id } = jwt.verify(token, config.TOKEN_KEY);

    const user = await User.findById(user_id);
    
    if (user) {

        const profile = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        return profile
    }

    else {
        throw new Error("User not Found")
    }

}

const updateProfile = async (req) => {

    if(
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.email
    ) {
        throw new Error("Send all required fields")
    }

    const token = req.body.token || req.query.token || req.headers['x-acess-token'];
    const { user_id } = jwt.verify(token, config.TOKEN_KEY);

    const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });

    if (user) {

        const profile = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }

        return profile
    }

    else {
        throw new Error("User not Found")
    }


}

module.exports = { fetchProfile, updateProfile };
