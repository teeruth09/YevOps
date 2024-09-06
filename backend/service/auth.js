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
    const { first_name, last_name, email, password, gender, dob, id_card, phone, address, role, user_name } = userData;

    if (!(email && password && first_name && last_name && gender && dob && id_card && phone && address && role && user_name)) {
        throw new Error("All input is required");
    }

    const oldEmail = await User.findOne({ email });
    const oldID = await User.findOne({ id_card });
    const oldPhone = await User.findOne({ phone });
    const oldName = await User.findOne({ user_name });

    if (oldEmail) {
        throw new Error("This Email is already used");
    }
    
    if (oldID) {
        throw new Error("This ID card is already used");
    }

    if (oldPhone) {
        throw new Error("This phone number is already used");
    }

    if (oldName) {
        throw new Error("This username is already used");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        gender,
        dob,
        id_card,
        phone,
        address,
        role,
        user_name
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
