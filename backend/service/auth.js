const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 


const loginUser = async (userData) => {

    const {email, password} = userData;
    
    if (!(email && password)) {
        throw new Error("User not Found")
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        )
        user.token = token;
        
        return user;
    }

}

const registerUser = async (userData) => {
    const { first_name, last_name, email, password } = userData;

    if (!(email && password && first_name && last_name)) {
        throw new Error("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        throw new Error("User already exists. Please login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword
    });

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );

    user.token = token;
    return user;
};

module.exports = { loginUser, registerUser };
