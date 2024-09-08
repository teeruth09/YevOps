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

    else{
        throw new Error("Incorrect Password");
    }

}

const registerUser = async (userData) => {
    const { first_name, last_name, email, password, gender, dob, id_card, phone, address, role, name } = userData;

    if (!(email && password && first_name && last_name && gender && dob && id_card && phone && address && role && name)) {
        throw new Error("All input is required");
    }

    const userCheck = [
        { key: 'email', value: email },
        { key: 'id_card', value: id_card },
        { key: 'phone', value: phone },
        { key: 'name', value: name }
    ];

    for (const check of userCheck) {
        const existingUser = await User.findOne({ [check.key]: check.value });
        if (existingUser) {
            switch (check.key) {
                case 'email':
                    throw new Error("This Email is already used");
                case 'id_card':
                    throw new Error("This ID card is already used");
                case 'phone':
                    throw new Error("This phone number is already used");
                case 'name':
                    throw new Error("This username is already used");
                default:
                    throw new Error("Unknown field error");
            }
        }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = {
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
        name,
    };

    if (role === "online shop") {
        newUser.shop_name = name;
    }

    const user = await User.create(newUser);

    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
    );

    user.token = token;
    return user;
};

module.exports = { loginUser, registerUser };
